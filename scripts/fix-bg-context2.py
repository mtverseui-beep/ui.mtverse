#!/usr/bin/env python3
"""Fix context pattern: move useContext from parent to child component."""
import os, re

BG_DIR = "/home/z/my-project/src/components/cards/backgrounds"

files = [
    "LiquidMetalBg", "GeometricGridBg", "NeonWaveBg", "FloatingOrbsBg",
    "GradientMeshBg", "BokehLightsBg", "TopographicBg", "HolographicBg",
    "CrystalShardsBg", "LavaLampBg", "CyberGridBg", "OrigamiFoldsBg",
    "MeshGradientBg", "AuroraBorealisBg", "NoiseTextureBg", "FloatingCodeBg",
    "ColorAudioBarsBg", "GlassmorphismBlurBg", "GradientWavesBg",
]

for name in files:
    path = os.path.join(BG_DIR, f"{name}.tsx")
    with open(path, "r") as f:
        content = f.read()
    
    # Skip if already has child component pattern (no useContext in export function)
    export_match = re.search(r'export function (\w+)\(\) \{([^}]*useContext[^}]*)\}', content)
    if not export_match:
        print(f"  - {name}: already fixed or different pattern")
        continue
    
    comp_name = name
    content_name = name.replace("Bg", "Content")
    
    # Extract the full export function body
    # Find "export function XBg() {" and extract until matching "}"
    start = content.index("export function")
    depth = 0
    end = start
    for i in range(start, len(content)):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                end = i + 1
                break
    
    func_body = content[start:end]
    
    # Extract BackgroundShell props
    bs_match = re.search(r'<BackgroundShell([^>]*)>', func_body)
    bs_props = bs_match.group(1) if bs_match else ""
    
    # Extract everything between <BackgroundShell...> and </BackgroundShell>
    inner_match = re.search(r'<BackgroundShell[^>]*>(.*)</BackgroundShell>', func_body, re.DOTALL)
    inner = inner_match.group(1).strip() if inner_match else ""
    
    # Extract useContext + variable declarations (before return)
    header_match = re.search(r'\{([^}]*useContext[^}]*)\}', func_body)
    header = header_match.group(1).strip() if header_match else ""
    # Remove "return" from header if present
    header = header.replace("return", "").strip()
    # Clean up: ensure it ends with semicolon
    if header and not header.endswith(";"):
        header += ";"
    
    # Build new code
    new_func = f'''export function {comp_name}() {{
  return (
    <BackgroundShell{bs_props}>
      <{content_name} />
    </BackgroundShell>
  );
}}

function {content_name}() {{
  {header}
  return (
    {inner}
  );
}}'''
    
    # Replace old function with new
    new_content = content[:start] + new_func + content[end:]
    
    with open(path, "w") as f:
        f.write(new_content)
    print(f"✓ {name}")

print(f"\nFixed all backgrounds")
