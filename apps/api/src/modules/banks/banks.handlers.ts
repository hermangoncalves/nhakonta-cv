import { AppRouteHandler } from "@/types";
import { CreateBankRoute, DeleteBankRoute, ListBanksRoute, UpdateBankRoute } from "./banks.routes";
import * as HttpStatusCode from '@/utils/http-status-codes';
import getDB from "@/db";
import { banks } from "@/db/schemas";
import { count, eq } from "drizzle-orm";
import { usersServices } from "../users/users.services";
import { bankServices } from "./banks.services";
import { sendDiscordNotification } from "@/utils/notifications";

export const createBank: AppRouteHandler<CreateBankRoute> = async (c) => {
    const { clerkId } = c.get('user')
    const body = c.req.valid('json');

    const db = getDB(c);

    const user = await usersServices.getUserByClerkId(c, clerkId)

    if (!user) {
        await sendDiscordNotification(c, {
            title: "Erro ao Adiconar Conta bancária",
            description: `Usuário com clerkId '${clerkId}' não encontrado.`,
            status: "error",
        });
        return c.json({
            error: 'User not found',
        }, HttpStatusCode.UNAUTHORIZED);
    }

    const [newBank] = await bankServices.createBank(c, {
        ...body,
        clerkId,
        userId: user.id
    })

    if (!newBank) {
        console.log('Failed to create bank account');
        await sendDiscordNotification(c, {
            title: "Erro ao Criar Conta",
            description: `Erro interno ao criar conta bancária para o usuário '${user.id}'.`,
            status: "error",
        });
        return c.json({
            error: 'Failed to create bank account',
        }, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }

    await sendDiscordNotification(c, {
        title: "Nova Conta",
        description: "Uma nova conta bancária foi criada com sucesso.",
        status: "success",
    });

    return c.json({
        id: newBank.id,
    }, HttpStatusCode.CREATED);
}

export const listBanks: AppRouteHandler<ListBanksRoute> = async (c) => {
    const { clerkId } = c.get('user')
    const { page = '1', limit = '10' } = c.req.valid('query');
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const offset = (pageNumber - 1) * limitNumber;

    const db = getDB(c);

    const user = await usersServices.getUserByClerkId(c, clerkId)

    if (!user) {
        await sendDiscordNotification(c, {
            title: "Erro ao Listar Contas",
            description: `Usuário com clerkId '${clerkId}' não encontrado.`,
            status: "error",
        });
        return c.json({
            error: 'User not found',
        }, HttpStatusCode.UNAUTHORIZED);
    }

    const results = await bankServices.listBanks(c, user.id, clerkId, limitNumber, offset)

    const [{ count: totalCount }] = await db.select({ count: count() })
        .from(banks)
        .where(eq(banks.clerkId, clerkId));

    return c.json({
        banks: results,
        totalAccounts: totalCount,
        totalShared: totalCount,
    }, HttpStatusCode.OK);
}

export const deleteBank: AppRouteHandler<DeleteBankRoute> = async (c) => {
    const db = getDB(c);
    const { clerkId } = c.get('user')
    const { id } = c.req.valid('param');

    const user = await usersServices.getUserByClerkId(c, clerkId)

    if (!user) {
        await sendDiscordNotification(c,{
            title: "Erro ao Deletar Conta",
            description: `Usuário com clerkId '${clerkId}' não encontrado.`,
            status: "error",
        });
        return c.json({
            error: 'User not found',
        }, HttpStatusCode.UNAUTHORIZED);
    }

    const existingBank = await bankServices.checkBankExists(db, id, user.id)

    if (!existingBank) {
        await sendDiscordNotification(c,{
            title: "Erro ao Deletar Conta",
            description: `Conta bancária com ID '${id}' não encontrada para o usuário '${user.id}'.`,
            status: "error",
        });
        return c.json({
            error: 'Bank account not found',
        }, HttpStatusCode.NOT_FOUND);
    }

    await bankServices.deleteBank(db, existingBank.id, user.id)

    await sendDiscordNotification(c,{
        title: "Conta Deletada",
        description: `Conta bancária com ID '${id}' foi deletada com sucesso.`,
        status: "success",
    });

    return c.body(null, HttpStatusCode.NO_CONTENT);
}

export const updateBank: AppRouteHandler<UpdateBankRoute> = async (c) => {
    const db = getDB(c);
    const { clerkId } = c.get('user')
    const { id } = c.req.valid('param');
    const body = c.req.valid('json');

    const user = await usersServices.getUserByClerkId(c, clerkId)

    if (!user) {
        await sendDiscordNotification(c,{
            title: "Erro ao Atualizar Conta",
            description: `Usuário com clerkId '${clerkId}' não encontrado.`,
            status: "error",
        });
        return c.json({
            error: 'User not found',
        }, HttpStatusCode.UNAUTHORIZED);
    }

    const [updatedBank] = await bankServices.updateBank(db, id, user.id, body)

    if (!updatedBank) {
        await sendDiscordNotification(c,{
            title: "Erro ao Atualizar Conta",
            description: `Conta bancária com ID '${id}' não encontrada para o usuário '${user.id}'.`,
            status: "error",
        });
        return c.json({
            error: 'Bank account not found',
        }, HttpStatusCode.NOT_FOUND);
    }

    await sendDiscordNotification(c,{
        title: "Conta Atualizada",
        description: `Conta bancária com ID '${id}' foi atualizada com sucesso.`,
        status: "success",
    });

    return c.json(updatedBank, HttpStatusCode.OK);
}