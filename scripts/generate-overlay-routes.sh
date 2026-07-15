#!/bin/bash
# Generate 24 individual card wrapper files + 24 app route pages for Modals section

cd /home/z/my-project

# Define all 24 components: slug|ComponentName|batchFile
components=(
  "confirmation-dialog-card|ConfirmationDialog|batch-1"
  "delete-alert-card|DeleteAlert|batch-1"
  "command-palette-card|CommandPalette|batch-1"
  "quick-view-modal-card|QuickViewModal|batch-1"
  "product-preview-card|ProductPreview|batch-1"
  "checkout-drawer-card|CheckoutDrawer|batch-1"
  "cart-drawer-card|CartDrawer|batch-1"
  "filter-drawer-card|FilterDrawer|batch-1"
  "settings-modal-card|SettingsModal|batch-2"
  "invite-team-dialog-card|InviteTeamDialog|batch-2"
  "share-dialog-card|ShareDialog|batch-2"
  "file-preview-modal-card|FilePreviewModal|batch-2"
  "search-overlay-card|SearchOverlay|batch-2"
  "notification-panel-card|NotificationPanel|batch-2"
  "contact-form-modal-card|ContactFormModal|batch-2"
  "upgrade-plan-modal-card|UpgradePlanModal|batch-2"
  "onboarding-dialog-card|OnboardingDialog|batch-3"
  "multi-step-modal-card|MultiStepModal|batch-3"
  "fullscreen-editor-card|FullscreenEditor|batch-3"
  "mobile-bottom-sheet-card|MobileBottomSheet|batch-3"
  "context-menu-card|ContextMenu|batch-3"
  "hover-card-card|HoverCard|batch-3"
  "popover-form-card|PopoverForm|batch-3"
  "nested-drawer-card|NestedDrawer|batch-3"
)

for entry in "${components[@]}"; do
  IFS='|' read -r slug component batch <<< "$entry"
  
  # Create wrapper card file
  cat > "src/components/cards/overlays/${component}Card.tsx" << EOF
"use client";
export { ${component} as ${component}Card } from "./${batch}";
EOF
  
  # Create app route directory + page
  mkdir -p "src/app/components/cards/${slug}"
  cat > "src/app/components/cards/${slug}/page.tsx" << EOF
"use client";
import { PageShowcase } from "@/components/navbar-showcase/PageShowcase";
import { ${component}Card } from "@/components/cards/overlays/${component}Card";

export default function Page() {
  return (
    <PageShowcase slug="${slug}">
      <${component}Card />
    </PageShowcase>
  );
}
EOF
  
  echo "✓ ${slug}"
done

echo ""
echo "Total: ${#components[@]} components created"
