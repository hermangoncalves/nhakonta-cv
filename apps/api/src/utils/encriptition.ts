async function encrypt(text: string, key: string) {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const keyBuffer = encoder.encode(key)

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyBuffer,
        {
            name: 'AES-GCM'
        },
        false,
        ['encrypt']
    )

    const iv = crypto.getRandomValues(new Uint8Array(12))

    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        cryptoKey,
        data
    );

    const ivHex = Array.from(iv)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    const encryptedHex = Array.from(new Uint8Array(encrypted))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    return `${ivHex}:${encryptedHex}`;
}

async function decrypt(encryptedData: string, key: string): Promise<string> {
    const [ivHex, encryptedHex] = encryptedData.split(":");
    const iv = new Uint8Array(
        ivHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    );
    const encrypted = new Uint8Array(
        encryptedHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    );
    const keyBuffer = new TextEncoder().encode(key);
    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-GCM" },
        false,
        ["decrypt"]
    );
    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        cryptoKey,
        encrypted
    );
    return new TextDecoder().decode(decrypted);
}