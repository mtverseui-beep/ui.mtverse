#!/usr/bin/env python3
"""Fix all backgrounds: move useContext into child component so it reads from BackgroundShell's context."""
import os, re

BG_DIR = "/home/z/my-project/src/components/cards/backgrounds"

# These backgrounds have the useContext in the wrong place (parent instead of child)
# Pattern: export function XBg() { const { dark } = useContext(...); return <BackgroundShell>...<div style={dark ? ...}>...</div></BackgroundShell>; }
# Fix: export function XBg() { return <BackgroundShell><Content /></BackgroundShell>; } function Content() { const { dark } = useContext(...); return ...; }

files_to_fix = [
    "LiquidMetalBg", "GeometricGridBg", "NeonWaveBg", "FloatingOrbsBg",
    "GradientMeshBg", "BokehLightsBg", "TopographicBg", "HolographicBg",
    "CrystalShardsBg", "LavaLampBg", "CyberGridBg", "OrigamiFoldsBg",
    "MeshGradientBg", "AuroraBorealisBg", "NoiseTextureBg", "FloatingCodeBg",
    "ColorAudioBarsBg", "GlassmorphismBlurBg", "GradientWavesBg",
]

for name in files_to_fix:
    path = os.path.join(BG_DIR, f"{name}.tsx")
    with open(path, "r") as f:
        content = f.read()
    
    # Extract the component name
    # Pattern: export function XBg() { const { dark } = useContext(BgContext); ... return ( <BackgroundShell ...>CONTENT</BackgroundShell> ); }
    
    # Find the export function and extract its body
    match = re.search(r'export function (\w+)\(\) \{\s*const \{ dark \} = useContext\(BgContext\);\s*(.*?)\s*return \(\s*<BackgroundShell([^>]*)>(.*?)</BackgroundShell>\s*\);\s*\}', content, re.DOTALL)
    
    if not match:
        # Try simpler pattern without extra vars
        match = re.search(r'export function (\w+)\(\) \{\s*const \{ dark \} = useContext\(BgContext\);\s*return \(\s*<BackgroundShell([^>]*)>(.*?)</BackgroundShell>\s*\);\s*\}', content, re.DOTALL)
        if match:
            comp_name = match.group(1)
            shell_props = match.group(2)
            inner_content = match.group(3)
        else:
            print(f"  ⚠ {name}: pattern not found, skipping")
            continue
    else:
        comp_name = match.group(1)
        extra_vars = match.group(2)
        shell_props = match.group(3)
        inner_content = match.group(4)
    
    # Build the fixed version
    inner_comp_name = comp_name.replace("Bg", "Content")
    
    fixed = f'''export function {comp_name}() {{
  return (
    <BackgroundShell{shell_props}>
      <{inner_comp_name} />
    </BackgroundShell>
  );
}}

function {inner_comp_name}() {{
  const {{ dark }} = useContext(BgContext);
{extra_vars if 'extra_vars' in dir() and extra_vars.strip() else ""}
  return ({inner_content});
}}
'''
    
    # Replace the old function with the fixed one
    # Find the start and end of the export function
    start = content.find("export function")
    # Find the matching closing brace
    brace_count = 0
    end = start
    in_string = False
    string_char = None
    for i in range(start, len(content)):
        c = content[i]
        if in_string:
            if c == string_char and content[i-1] != '\\\\':
                in_string = False
        elif c in '"\'`':
            in_string = True
            string_char = c
        elif c == '{':
            brace_count += 1
        elif c == '}':
            brace_count -= 1
            if brace_count == 0:
                end = i + 1
                break
    
    # Also find any <style jsx> blocks that come after
    style_match = re.search(r'(<style jsx>.*?</style>)', content[end:], re.DOTALL)
    if style_match:
        # Move style into the inner component
        style_block = style_match.group(1)
        fixed = fixed.rstrip('}\n') + f'\n{style_block}\n}}\n'
        end += style_match.end()
    
    new_content = content[:start] + fixed + content[end:]
    
    with open(path, "w") as f:
        f.write(new_content)
    print(f"✓ {name}")

print(f"\nFixed {len(files_to_fix)} backgrounds")
