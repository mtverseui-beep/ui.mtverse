"use client";

import { AppearanceSettings } from "../premium-tinte-chatgpt/appearance-settings";
import { ButtonGroupDemo } from "../premium-tinte-chatgpt/button-group-demo";
import { ButtonGroupInputGroup } from "../premium-tinte-chatgpt/button-group-input-group";
import { ButtonGroupNested } from "../premium-tinte-chatgpt/button-group-nested";
import { ButtonGroupPopover } from "../premium-tinte-chatgpt/button-group-popover";
import { EmptyAvatarGroup } from "../premium-tinte-chatgpt/empty-avatar-group";
import { FieldDemo } from "../premium-tinte-chatgpt/field-demo";
import { FieldSlider } from "../premium-tinte-chatgpt/field-slider";
import { InputGroupButtonExample } from "../premium-tinte-chatgpt/input-group-button";
import { InputGroupDemo } from "../premium-tinte-chatgpt/input-group-demo";
import { ItemDemo } from "../premium-tinte-chatgpt/item-demo";
import { NotionPromptForm } from "../premium-tinte-chatgpt/notion-prompt-form";
import { SpinnerBadge } from "../premium-tinte-chatgpt/spinner-badge";
import { SpinnerEmpty } from "../premium-tinte-chatgpt/spinner-empty";
import { Checkbox } from "../premium-tinte-chatgpt/ui/checkbox";
import { Field, FieldLabel, FieldSeparator } from "../premium-tinte-chatgpt/ui/field";
import { Card } from "../premium-tinte-chatgpt/ui/card";
import { ThemeHeader } from "../premium-tinte-chatgpt/theme-header";

const CHATGPT_THEME_CSS = `
.chatgpt-theme-wrapper {
  --background: #ffffff;
  --foreground: #181818;
  --card: #ffffff;
  --card-foreground: #000000;
  --popover: #ffffff;
  --popover-foreground: #000000;
  --primary: #181818;
  --primary-foreground: #ffffff;
  --secondary: #9e9e9e;
  --secondary-foreground: #ffffff;
  --muted: #e0e0e0;
  --muted-foreground: #6f686a;
  --accent: #c5d5e7;
  --accent-foreground: #000000;
  --destructive: #986802;
  --destructive-foreground: #ffffff;
  --border: #e0e0e0;
  --input: #c0c0c0;
  --ring: #181818;
  --chart-1: #181818;
  --chart-2: #a627a4;
  --chart-3: #9e9e9e;
  --chart-4: #4078f2;
  --chart-5: #616161;
  --sidebar: #f3f3f3;
  --sidebar-foreground: #000000;
  --sidebar-primary: #181818;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #ffffff;
  --sidebar-accent-foreground: #000000;
  --sidebar-border: #e0e0e0;
  --sidebar-ring: #181818;
  --radius: 1rem;
  --shadow-color: hsl(0 0% 0%);
  --shadow-opacity: 0.1;
  --shadow-blur: 4px;
  --shadow-spread: 0px;
  --shadow-offset-x: 0px;
  --shadow-offset-y: 2px;
  background-color: var(--background);
  color: var(--foreground);
}
.chatgpt-theme-wrapper.dark {
  --background: #212121;
  --foreground: #f3f3f3;
  --card: #2a2a2a;
  --card-foreground: #ffffff;
  --popover: #1a1a1a;
  --popover-foreground: #ffffff;
  --primary: #f3f3f3;
  --primary-foreground: #000000;
  --secondary: #505050;
  --secondary-foreground: #f3f3f3;
  --muted: #201b1c;
  --muted-foreground: #a9a8a8;
  --accent: #3a5d72;
  --accent-foreground: #ffffff;
  --destructive: #ee5f92;
  --destructive-foreground: #000000;
  --border: #313131;
  --input: #4b4b4b;
  --ring: #db3d43;
  --chart-1: #f22d3d;
  --chart-2: #c47800;
  --chart-3: #ff8782;
  --chart-4: #7f4100;
  --chart-5: #a1000f;
  --sidebar: #181818;
  --sidebar-foreground: #ffffff;
  --sidebar-primary: #ff6060;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #181818;
  --sidebar-accent-foreground: #ffffff;
  --sidebar-border: #313131;
  --sidebar-ring: #db3d43;
}
`;

export function ChatGptThemeCard() {
  return (
    <div className="chatgpt-theme-wrapper min-h-full bg-background text-foreground">
      <style>{CHATGPT_THEME_CSS}</style>
      <ThemeHeader />
      <div className="@container font-sans p-4">
        <div className="grid gap-4 @md:grid-cols-2 @4xl:grid-cols-3 @6xl:grid-cols-4">
          <div className="order-1 flex flex-col gap-4">
            <Card className="p-6">
              <FieldDemo />
            </Card>
          </div>
          <div className="order-2 flex flex-col gap-4">
            <Card className="p-6 *:[div]:border">
              <EmptyAvatarGroup />
            </Card>
            <Card className="p-6">
              <ButtonGroupInputGroup />
            </Card>
            <Card className="p-6">
              <FieldSlider />
            </Card>
            <Card className="p-6">
              <InputGroupDemo />
            </Card>
          </div>
          <div className="order-3 flex flex-col gap-4 @md:col-span-2 @4xl:col-span-1">
            <div className="grid gap-4 @md:grid-cols-2 @4xl:grid-cols-1">
              <Card className="p-6">
                <ItemDemo />
              </Card>
              <Card className="p-6">
                <FieldSeparator>Appearance Settings</FieldSeparator>
                <AppearanceSettings />
              </Card>
            </div>
          </div>
          <div className="order-first flex flex-col gap-4 @4xl:order-4 @md:col-span-2 @4xl:col-span-3 @6xl:col-span-1">
            <Card className="p-6 flex gap-2">
              <SpinnerBadge />
            </Card>
            <Card className="p-6">
              <InputGroupButtonExample />
            </Card>
            <Card className="p-6">
              <NotionPromptForm />
            </Card>
            <Card className="p-6">
              <ButtonGroupDemo />
            </Card>
            <Card className="p-6">
              <Field orientation="horizontal">
                <Checkbox id="checkbox-demo" defaultChecked />
                <FieldLabel htmlFor="checkbox-demo" className="line-clamp-1">
                  I agree to the terms and conditions
                </FieldLabel>
              </Field>
            </Card>
            <Card className="p-6 flex gap-4">
              <ButtonGroupNested />
              <ButtonGroupPopover />
            </Card>
            <Card className="p-6 *:[div]:border">
              <SpinnerEmpty />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
