export interface Client {
  name: string;
  email: string;
  phone: string;
  joinedOn: string;
  referralSource: string;
  manager: string;
  services: {
    service: string;
    status: string;
    lastUpdated: string;
  }[];
  documents: {
    fileName: string;
    type: string;
    uploadedOn: string;
    uploadedBy: string;
    action: string;
  }[];
  contacts: {
    date: string;
    time: string;
    contactedBy: string;
    notes: string;
  }[];
}

export const clients: Client[] = [
  {
    name: "Austin",
    email: "austin@gmail.com",
    phone: "+91 52528 636369",
    joinedOn: "9 May, 25",
    referralSource: "Jane",
    manager: "Elissa",
    services: [
      { service: "Accounting", status: "Bookkeeping", lastUpdated: "05/10/25" },
      { service: "Insurance", status: "On Hold", lastUpdated: "26/09/25" },
    ],
    documents: [
      {
        fileName: "Balance Sheet",
        type: "Report",
        uploadedOn: "05/09/25",
        uploadedBy: "Neha",
        action: "Download",
      },
      {
        fileName: "Bank Statement",
        type: "Upload",
        uploadedOn: "16/08/25",
        uploadedBy: "Client",
        action: "View",
      },
    ],
    contacts: [
      {
        date: "02/10/25",
        time: "12:30 PM",
        contactedBy: "Elissa",
        notes: "Requesting Invoice",
      },
      {
        date: "25/09/25",
        time: "5:00 PM",
        contactedBy: "Elissa",
        notes: "Sent Onboarding checklist",
      },
    ],
  },
  {
    name: "Rahul",
    email: "rahul@gmail.com",
    phone: "+91 99999 88888",
    joinedOn: "2 Oct, 25",
    referralSource: "Deepika",
    manager: "Elissa",
    services: [
      { service: "Accounting", status: "Onboarding", lastUpdated: "02/10/25" },
      { service: "Tax", status: "Pending", lastUpdated: "28/09/25" },
    ],
    documents: [
      {
        fileName: "Invoice Q3",
        type: "Report",
        uploadedOn: "01/10/25",
        uploadedBy: "Rahul",
        action: "View",
      },
      {
        fileName: "Invoice Q3",
        type: "Report",
        uploadedOn: "01/10/25",
        uploadedBy: "Rahul",
        action: "View",
      },
      {
        fileName: "Invoice Q3",
        type: "Report",
        uploadedOn: "01/10/25",
        uploadedBy: "Rahul",
        action: "View",
      },
      {
        fileName: "Invoice Q3",
        type: "Report",
        uploadedOn: "01/10/25",
        uploadedBy: "Rahul",
        action: "View",
      },
      {
        fileName: "Invoice Q3",
        type: "Report",
        uploadedOn: "01/10/25",
        uploadedBy: "Rahul",
        action: "View",
      },
      {
        fileName: "Invoice Q3",
        type: "Report",
        uploadedOn: "01/10/25",
        uploadedBy: "Rahul",
        action: "View",
      },
      {
        fileName: "Invoice Q3",
        type: "Report",
        uploadedOn: "01/10/25",
        uploadedBy: "Rahul",
        action: "View",
      },
      {
        fileName: "Invoice Q3",
        type: "Report",
        uploadedOn: "01/10/25",
        uploadedBy: "Rahul",
        action: "View",
      },
      {
        fileName: "Invoice Q3",
        type: "Report",
        uploadedOn: "01/10/25",
        uploadedBy: "Rahul",
        action: "View",
      },
      {
        fileName: "Invoice Q3",
        type: "Report",
        uploadedOn: "01/10/25",
        uploadedBy: "Rahul",
        action: "View",
      },
      {
        fileName: "Invoice Q3",
        type: "Report",
        uploadedOn: "01/10/25",
        uploadedBy: "Rahul",
        action: "View",
      },
      {
        fileName: "Invoice Q3",
        type: "Report",
        uploadedOn: "01/10/25",
        uploadedBy: "Rahul",
        action: "View",
      },
      {
        fileName: "Invoice Q3",
        type: "Report",
        uploadedOn: "01/10/25",
        uploadedBy: "Rahul",
        action: "View",
      },
    ],
    contacts: [
      {
        date: "02/10/25",
        time: "4:00 PM",
        contactedBy: "Elissa",
        notes: "Follow-up for tax details",
      },
      {
        date: "02/10/25",
        time: "4:00 PM",
        contactedBy: "Elissa",
        notes: "Follow-up for tax details",
      },
      {
        date: "02/10/25",
        time: "4:00 PM",
        contactedBy: "Elissa",
        notes: "Follow-up for tax details",
      },
      {
        date: "02/10/25",
        time: "4:00 PM",
        contactedBy: "Elissa",
        notes: "Follow-up for tax details",
      },
      {
        date: "02/10/25",
        time: "4:00 PM",
        contactedBy: "Elissa",
        notes: "Follow-up for tax details",
      },
      {
        date: "02/10/25",
        time: "4:00 PM",
        contactedBy: "Elissa",
        notes: "Follow-up for tax details",
      },
      {
        date: "02/10/25",
        time: "4:00 PM",
        contactedBy: "Elissa",
        notes: "Follow-up for tax details",
      },
    ],
  },
];
