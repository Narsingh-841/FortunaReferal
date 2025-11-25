import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import ServiceCard from "./ServiceCard";
import ClientServiceCard from "./ClientServiceCard";
import ServiceCardLocked from "./ServiceCardLocked";
import EssentialServicesSidebar from "./EssentialServicesSidebar";

const SortableItem = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

// 🧩 Main Dashboard
export default function ServicesDashboard() {
  const role: string = "staff"; // can be "client" or "staff"
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed on mobile

  // Data
  const [services, setServices] = useState([
    { id: "Finance", totalReferrals: 15, inProgress: 10, converted: 9 },
    { id: "Legal", totalReferrals: 50, inProgress: 40, converted: 25 },
    { id: "IT", totalReferrals: 42, inProgress: 35, converted: 21 },
    { id: "Accounting", totalReferrals: 95, inProgress: 80, converted: 50 },
  ]);

  const [clientServices, setClientServices] = useState([
    {
      id: "Finance",
      stage: "Active",
      lastContactDate: "Oct 20, 2025",
      contactName: "John Doe",
    },
    {
      id: "Legal",
      stage: "Onboarding",
      lastContactDate: "Oct 18, 2025",
      contactName: "Sarah Lee",
    },
    {
      id: "IT",
      stage: "On Hold",
      lastContactDate: "Oct 15, 2025",
      contactName: "Raj Kumar",
    },
    {
      id: "SM",
      stage: "On Hold",
      lastContactDate: "Oct 15, 2025",
      contactName: "Raj Kumar",
    },
    {
      id: "OP",
      stage: "On Hold",
      lastContactDate: "Oct 15, 2025",
      contactName: "Raj Kumar",
    },
  ]);

  const lockedServices = [
    {
      id: "Accounting Plus",
      title: "Accounting Plus",
      description: "Upgrade to unlock analytics and advanced reports.",
      subServices: ["Advanced Insights", "Team Access", "Priority Support"],
    },
    {
      id: "Insurance Premium",
      title: "Insurance Premium",
      description: "Get access to premium insurance tools and dashboards.",
      subServices: [
        "Claims Tracking",
        "Policy Comparison",
        "Analytics Dashboard",
      ],
    },
  ];

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      if (role === "client") {
        const oldIndex = clientServices.findIndex((s) => s.id === active.id);
        const newIndex = clientServices.findIndex((s) => s.id === over.id);
        setClientServices((items) => arrayMove(items, oldIndex, newIndex));
      } else {
        const oldIndex = services.findIndex((s) => s.id === active.id);
        const newIndex = services.findIndex((s) => s.id === over.id);
        setServices((items) => arrayMove(items, oldIndex, newIndex));
      }
    }
  };

  return (
    <div className="flex h-full overflow-hidden"> {/* Added overflow-hidden */}
      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-500 ease-in-out ${
          isSidebarOpen ? "lg:mr-0" : "mr-0"
        }`}
      >
        <div className="p-4 lg:p-6"> {/* Added responsive padding */}
          <h1 className="text-xl lg:text-2xl font-semibold mb-6">Services</h1>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            {role === "client" ? (
              <>
                {/* 🟩 Client draggable service cards */}
                <SortableContext
                  items={clientServices.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-wrap gap-6">
                    {clientServices.map((service) => (
                      <SortableItem key={service.id} id={service.id}>
                        <ClientServiceCard
                          title={service.id}
                          stage={service.stage as any}
                          lastContactDate={service.lastContactDate}
                          contactName={service.contactName}
                        />
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>

                {/* 🔒 Locked services */}
                <div className="flex flex-wrap gap-6 mt-8">
                  {lockedServices.map((locked) => (
                    <ServiceCardLocked
                      key={locked.id}
                      title={locked.title}
                      description={locked.description}
                      subServices={locked.subServices}
                    />
                  ))}
                </div>
              </>
            ) : (
              // 🧩 Staff / default view
              <SortableContext
                items={services.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-wrap gap-6">
                  {services.map((service) => (
                    <SortableItem key={service.id} id={service.id}>
                      <ServiceCard
                        title={service.id}
                        totalReferrals={service.totalReferrals}
                        inProgress={service.inProgress}
                        converted={service.converted}
                      />
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            )}
          </DndContext>
        </div>
      </div>

      {/* Sidebar — only for clients */}
      {role === "client" && (
        <EssentialServicesSidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
      )}
    </div>
  );
}