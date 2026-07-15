import { CardPage } from "@/components/library/CardPage";
import { EventBookingCard } from "@/components/cards/EventBookingCard";

export default function Page() {
  return (
    <CardPage slug="event-booking-card">
      <EventBookingCard />
    </CardPage>
  );
}
