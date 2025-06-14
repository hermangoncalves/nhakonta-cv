import { AppBindings } from "@/types";
import axios from "axios";
import { Context } from "hono";

export type DiscordNotificationStatus = "success" | "error" | "info" | "warning";

export interface DiscordNotificationPayload {
    title: string;
    description: string;
    status: DiscordNotificationStatus;
}

export async function sendDiscordNotification(
    c: Context<AppBindings>,
    payload: DiscordNotificationPayload
): Promise<void> {
    try {
        await axios.post(
            c.env.DISCORD_WEBHOOK,
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Erro ao enviar notificação para o Discord:", error);
        throw error;
    }
}

export async function notifyDiscord(c: Context, payload: DiscordNotificationPayload) {
    c.executionCtx.waitUntil(
        sendDiscordNotification(c, payload).catch((err) => {
            console.error('Erro enviando notificação Discord:', err)
        })
    )
}

