import moduleAlias from "module-alias";
import path from "path";

const contextDir =
  process.env.NODE_ENV?.toLocaleLowerCase() === "production" ? "dist" : "src";

moduleAlias.addAliases({
  "@modules": path.resolve(process.cwd(), contextDir, "modules"),
  "@shared": path.resolve(process.cwd(), contextDir, "shared"),
  "@config": path.resolve(process.cwd(), contextDir, "config"),
});
