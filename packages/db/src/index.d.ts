import "dotenv/config";
import "dotenv/config";
declare const prismaSingleton: () => import("./generated/prisma/internal/class.js").PrismaClient<never, import("./generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined, import("@prisma/client/runtime/client").DefaultArgs>;
declare global {
    var prisma: undefined | ReturnType<typeof prismaSingleton>;
}
declare const prismaClient: import("./generated/prisma/internal/class.js").PrismaClient<never, import("./generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined, import("@prisma/client/runtime/client").DefaultArgs>;
export { prismaClient };
//# sourceMappingURL=index.d.ts.map