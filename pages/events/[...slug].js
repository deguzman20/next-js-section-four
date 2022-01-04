import { useRouter } from 'next/router'; 
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import Button from '../../ui/button';
import ErrorAlert from '../../ui/error-alert';

function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;

  if(!filterData) {
    return <p className='center'>Loading...</p>
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if(
    isNaN(numYear) || 
    isNaN(numMonth) || 
    numYear > 2030 || 
    numYear < 2021 || 
    numMonth < 1 || 
    numMonth > 12) {
    return (
      <>
        <ErrorAlert>
          <p>invalid filter, please adjust your value</p>
        </ErrorAlert>
        <div className='center'>
          <Button link={'/events'}>Show all events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if(!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link={'/events'}>Show all events</Button>
        </div>
      </>
    );
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventsPage;