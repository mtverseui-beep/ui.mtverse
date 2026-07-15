"use client";

import { AppearanceSettings } from "../premium-tinte-supabase/appearance-settings";
import { ButtonGroupDemo } from "../premium-tinte-supabase/button-group-demo";
import { ButtonGroupInputGroup } from "../premium-tinte-supabase/button-group-input-group";
import { ButtonGroupNested } from "../premium-tinte-supabase/button-group-nested";
import { ButtonGroupPopover } from "../premium-tinte-supabase/button-group-popover";
import { EmptyAvatarGroup } from "../premium-tinte-supabase/empty-avatar-group";
import { FieldDemo } from "../premium-tinte-supabase/field-demo";
import { FieldSlider } from "../premium-tinte-supabase/field-slider";
import { InputGroupButtonExample } from "../premium-tinte-supabase/input-group-button";
import { InputGroupDemo } from "../premium-tinte-supabase/input-group-demo";
import { ItemDemo } from "../premium-tinte-supabase/item-demo";
import { NotionPromptForm } from "../premium-tinte-supabase/notion-prompt-form";
import { SpinnerBadge } from "../premium-tinte-supabase/spinner-badge";
import { SpinnerEmpty } from "../premium-tinte-supabase/spinner-empty";
import { Checkbox } from "../premium-tinte-supabase/ui/checkbox";
import { Field, FieldLabel, FieldSeparator } from "../premium-tinte-supabase/ui/field";
import { Card } from "../premium-tinte-supabase/ui/card";
import { ThemeHeader } from "../premium-tinte-supabase/theme-header";

const SUPABASE_THEME_CSS = `
.supabase-theme-wrapper {
  --background: #fcfcfc;
  --foreground: #171717;
  --card: #ffffff;
  --card-foreground: #000000;
  --popover: #ffffff;
  --popover-foreground: #000000;
  --primary: #72e4ad;
  --primary-foreground: #171717;
  --secondary: #7b7c7b;
  --secondary-foreground: #fcfcfc;
  --muted: #efedee;
  --muted-foreground: #797376;
  --accent: #c5f8dc;
  --accent-foreground: #000000;
  --destructive: #ca3214;
  --destructive-foreground: #ffffff;
  --border: #dfdfdf;
  --input: #e9e6e6;
  --ring: #2f8054;
  --chart-1: #387c55;
  --chart-2: #387c55;
  --chart-3: #81af91;
  --chart-4: #004d28;
  --chart-5: #004d28;
  --sidebar: #fcfcfc;
  --sidebar-foreground: #000000;
  --sidebar-primary: #72e4ad;
  --sidebar-primary-foreground: #171717;
  --sidebar-accent: #ffffff;
  --sidebar-accent-foreground: #000000;
  --sidebar-border: #dfdfdf;
  --sidebar-ring: #2f8054;
  --radius: 0.375rem;
  --shadow-color: hsl(0 0% 0%);
  --shadow-opacity: 0.1;
  --shadow-blur: 4px;
  --shadow-spread: 0px;
  --shadow-offset-x: 0px;
  --shadow-offset-y: 2px;
  background-color: var(--background);
  color: var(--foreground);
}
`;

export function SupabaseThemeCard() {
  return (
    <div className="supabase-theme-wrapper min-h-full bg-background text-foreground">
      <style>{SUPABASE_THEME_CSS}</style>
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
