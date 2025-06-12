import z, { ZodSchema } from "zod";

const envSchema = z.object({
  API_URL: z.string(),
  CLERK_PUBLISHABLE_KEY: z.string(),
});

function zodEnv<T extends ZodSchema>(
  schema: T,
  source: Record<string, string>
): z.infer<T> {
  const viteEnv = Object.entries(source).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (key.startsWith("VITE_")) {
        const newKey = key.replace("VITE_", "");
        acc[newKey] = value;
      }

      return acc;
    },
    {}
  );

  const parsed = schema.safeParse(viteEnv);

  if (!parsed.success) {
    throw new Error("Failed to validate enviroments variables");
  }

  return parsed.data;
}

export const env = zodEnv(envSchema, import.meta.env);
