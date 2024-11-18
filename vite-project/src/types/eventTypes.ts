// src/types/eventTypes.ts
export type EventPage = {
    id: number;
    header: string;
    location: string;
    date_range: string;
    organization: string;
    optional_event_description_bold_text: string;
    event_description: string;
    hidden: string;
};

export type NewEventPage = Omit<EventPage, 'id'>;

    // event_image: File | null;

export type EventCard = {
    title: string;
    bold: string;
    what: string;
    who: string;
    when_date: string;
    flyer_link: string;
    apply_link: string;
    is_full: string;
    major_event_associated: string;
};

export type RetrievedEventCard = {
    id: number
    title: string;
    bold: string;
    what: string;
    who: string;
    when_date: string;
    flyer_link: string;
    apply_link: string;
    is_full: string;
    major_event_associated: string;
};