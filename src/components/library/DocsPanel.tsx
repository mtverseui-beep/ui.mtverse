"use client";
import { motion } from "framer-motion";
import {
  Package, Copy, Check, ExternalLink, Info, PackageOpen,
  Settings, Zap, Code2, FolderTree, Terminal, MoonStar,
} from "lucide-react";
import { useState, useCallback } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface DocsPanelProps {
  slug: string;
  title: string;
  animation: string;
  accent: string;
  componentName: string;
  npmPackages: string[];
  dependencies: Array<{ path?: string; label: string; content?: string } | string>;
  category: string;
  sourcePath?: string;
  installCommand?: string;
}

export function DocsPanel({
  slug, title, animation, accent, componentName, npmPackages, dependencies, category,
  sourcePath, installCommand,
}: DocsPanelProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = useCallback((id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const additionalPackages = npmPackages.filter(
    (packageName) => !["react", "react-dom", "next"].includes(packageName),
  );
  const installCmd = installCommand || (additionalPackages.length > 0
    ? `npm install ${additionalPackages.join(" ")}`
    : "No additional dependencies required");

  const importPath = sourcePath
    ? sourcePath.replace(/^src\//, "@/").replace(/\.(?:tsx?|jsx?)$/, "")
    : `@/components/cards/${category.toLowerCase() === "core" ? "more" : category.toLowerCase()}/${componentName}`;
  const usageCode = `import { ${componentName} } from "${importPath}"

export default function Example() {
  return (
    <div className="component-theme-scope">
      <${componentName} />
    </div>
  )
}`;

  const features = animation
    .split(/\s*(?:\u00b7|\u00c2\u00b7)\s*/)
    .map((feature) => feature.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6 p-2">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: EASE }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${accent}15` }}>
          <Package className="h-5 w-5" style={{ color: accent }} />
        </div>
        <div>
          <h2 className="text-[16px] font-bold cs-text">{title}</h2>
          <p className="text-[11px] cs-muted">{category} component</p>
        </div>
      </motion.div>

      {/* Overview */}
      <Section icon={Info} title="Overview" accent={accent}>
        <p className="text-[13px] leading-relaxed cs-muted">
          {title} is a {category.toLowerCase()} component for the mtverse UI library. {features.length > 0 && `It features ${features.slice(0, 3).join(", ")}${features.length > 3 ? " and more" : ""}.`}
        </p>
      </Section>

      {/* Features */}
      {features.length > 0 && (
        <Section icon={Zap} title="Features" accent={accent}>
          <ul className="space-y-1.5">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] cs-muted">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                {feature}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Installation */}
      <Section icon={Terminal} title="Installation" accent={accent}>
        <CodeBlock
          id="install"
          code={installCmd}
          copied={copied}
          onCopy={handleCopy}
          label="Terminal"
        />
      </Section>

      {/* Import */}
      <Section icon={PackageOpen} title="Import" accent={accent}>
        <CodeBlock
          id="import"
          code={`import { ${componentName} } from "${importPath}"`}
          copied={copied}
          onCopy={handleCopy}
          label="TypeScript"
        />
      </Section>

      {/* Usage */}
      <Section icon={Code2} title="Usage" accent={accent}>
        <CodeBlock
          id="usage"
          code={usageCode}
          copied={copied}
          onCopy={handleCopy}
          label="Example.tsx"
        />
      </Section>

      {/* Theme support */}
      <Section icon={MoonStar} title="Light & dark mode" accent={accent}>
        <p className="mb-2 text-[12px] leading-relaxed cs-muted">
          Wrap the component with <code className="font-mono cs-text">component-theme-scope</code>.
          Add <code className="font-mono cs-text">dark</code> to an ancestor (usually the
          document element) to switch themes. The shared CSS in the Code tab provides
          semantic colors and compatibility styles for legacy utility classes.
        </p>
        <CodeBlock
          id="theme"
          code={`<html className="dark">\n  <div className="component-theme-scope">\n    <${componentName} />\n  </div>\n</html>`}
          copied={copied}
          onCopy={handleCopy}
          label="Theme setup"
        />
      </Section>

      {/* Dependencies */}
      {dependencies.length > 0 && (
        <Section icon={FolderTree} title="Dependencies" accent={accent}>
          <div className="flex flex-wrap gap-1.5">
            {dependencies.map((dep, i) => (
              <span key={i} className="rounded-md border cs-border px-2 py-1 text-[11px] font-mono cs-subtle">
                {typeof dep === "string" ? dep : dep.label || dep.path}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* NPM Packages */}
      {additionalPackages.length > 0 && (
        <Section icon={Settings} title="NPM Packages" accent={accent}>
          <div className="flex flex-wrap gap-1.5">
            {additionalPackages.map((pkg, i) => (
              <a
                key={i}
                href={`https://www.npmjs.com/package/${pkg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-md border cs-border px-2 py-1 text-[11px] font-mono cs-subtle transition hover:cs-text"
              >
                {pkg}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </Section>
      )}

      {/* Copy component */}
      <Section icon={Copy} title="Copy Component" accent={accent}>
        <p className="mb-2 text-[12px] cs-muted">
          Copy the source code from the Code tab, or use the import path above to integrate this component into your project.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handleCopy("path", importPath)}
            className="flex items-center gap-1.5 rounded-lg border cs-border px-3 py-1.5 text-[11px] font-medium cs-muted transition hover:cs-text"
          >
            {copied === "path" ? <Check className="h-3.5 w-3.5" style={{ color: "#10b981" }} /> : <Copy className="h-3.5 w-3.5" />}
            Copy import path
          </button>
        </div>
      </Section>
    </div>
  );
}

function Section({ icon: Icon, title, accent, children }: {
  icon: typeof Info; title: string; accent: string; children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: EASE }}
    >
      <h3 className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider cs-subtle">
        <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

function CodeBlock({ id, code, copied, onCopy, label }: {
  id: string; code: string; copied: string | null; onCopy: (id: string, text: string) => void; label: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border cs-border">
      <div className="flex items-center justify-between px-3 py-1.5" style={{ background: "var(--card-surface-2)" }}>
        <span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">{label}</span>
        <button
          onClick={() => onCopy(id, code)}
          className="flex h-6 w-6 items-center justify-center rounded transition hover:bg-black/5 dark:hover:bg-white/5"
          style={{ color: "var(--card-text-muted)" }}
        >
          {copied === id ? <Check className="h-3.5 w-3.5" style={{ color: "#10b981" }} /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-[12px] leading-relaxed scrollbar-modern" style={{ background: "var(--card-surface)" }}>
        <code className="font-mono cs-text" style={{ whiteSpace: "pre-wrap" }}>{code}</code>
      </pre>
    </div>
  );
}
