import ServiceDetailsPage from "../ServiceDetailsPage";

const Finance = () => {
  const includedServices = [
    { title: "Sub Service #1", description: "Our tailored strategies empower your business to thrive." },
    { title: "Sub Service #2", description: "Our tailored strategies empower your business to thrive." },
    { title: "Sub Service #3", description: "Our tailored strategies empower your business to thrive." },
  ];

  const recentActivities = [
    { service: "Accounting", activity: "Tax", date: "19/08/25", time: "1:00 PM", assignee: "Elissa" },
    { service: "Accounting", activity: "Audit", date: "20/08/25", time: "4:00 PM", assignee: "Elissa" },
  ];

  const uploadItems = [
    { id: "1", name: "Financial Report.pdf", date: "20 Jul 25, 3:25pm", uploadedBy: "Olivia" },
    { id: "2", name: "Tax Summary.xlsx", date: "21 Jul 25, 5:10pm", uploadedBy: "Olivia" },
  ];

  return (
    <ServiceDetailsPage
      serviceName="Finance"
      activationDate="19/08/25"
      stage="Onboarding"
      lastContact="21/08/25"
      assignee={{ name: "Elissa", initial: "E" }}
      includedServices={includedServices}
      recentActivities={recentActivities}
      uploadItems={uploadItems}
      onUpload={(file) => console.log("Uploading:", file.name)}
      onDownload={(id) => console.log("Downloading file with id:", id)}
      onDelete={(id) => console.log("Deleting file with id:", id)}
    />
  );
};

export default Finance;
