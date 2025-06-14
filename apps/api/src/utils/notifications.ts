import { AppBindings } from "@/types";
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
    const url = "https://discord-notify-events.nhakonta-cv-api.workers.dev/api/v1/notify"
    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
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
