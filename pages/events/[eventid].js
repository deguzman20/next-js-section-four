import { Fragment } from 'react';
import { useRouter } from 'next/router'; 
import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/events/event-summary';
import EventLogistics from '../../components/events/event-logistics';
import EventContent from '../../components/events/event-content';

function EventDetailPage() {
  const router = useRouter();

  const eventId = router.query.eventid;
  const event = getEventById(eventId);

  if(!event) {
    return <p>No event found!</p>;
  }

  return (
    <Fragment>
      <EventSummary title={event.title}/>
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;