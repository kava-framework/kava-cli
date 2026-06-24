import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export function installDependencies(target: string): void {
  runInstall(target);
}

export function installPackage(target: string, packageName: string, isDev = false): void {
  runInstall(target, [packageName], isDev);
}

export function runInstall(target: string, packages: string[] = [], isDev = false): void {
  const useBun = fs.existsSync(path.join(target, "bun.lock"));
  const pm = useBun ? "bun" : "npm";
  const action = useBun ? "add" : "install";
  const devFlag = isDev ? (useBun ? "-d" : "--save-dev") : "";

  const command = packages.length > 0
    ? [pm, action, devFlag, ...packages].filter(Boolean).join(" ")
    : [pm, "install"].join(" ");

  console.log(`Running: ${command}`);

  execSync(command, {
    cwd: target,
    stdio: "inherit"
  });
}