import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import ServiceCard from "./ServiceCard";

const SortableItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
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

export default function ServicesDashboard() {
  const [services, setServices] = useState([
    { id: "Finance", totalReferrals: 15, inProgress: 10, converted: 9 },
    { id: "Legal", totalReferrals: 50, inProgress: 40, converted: 25 },
    { id: "IT", totalReferrals: 42, inProgress: 35, converted: 21 },
    { id: "Accounting", totalReferrals: 95, inProgress: 80, converted: 50 },
    { id: "Insurance", totalReferrals: 56, inProgress: 39, converted: 25 },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = services.findIndex((s) => s.id === active.id);
      const newIndex = services.findIndex((s) => s.id === over.id);
      setServices((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Services</h1>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={services.map((s) => s.id)} strategy={verticalListSortingStrategy}>
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
      </DndContext>

      {/* Summary Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex w-full items-center justify-between gap-2 border border-gray-200 shadow-sm rounded-lg px-6 py-3">
            <span className="text-md font-semibold">Total Referrals</span>
            <span className="text-md font-semibold">200</span>
          </div>
          <div className="flex w-full items-center justify-between gap-2 border border-gray-200 shadow-sm rounded-lg px-6 py-3">
            <span className="text-md font-semibold">In Progress</span>
            <span className="text-md font-semibold">150</span>
          </div>
          <div className="flex w-full items-center justify-between gap-2 border border-gray-200 shadow-sm rounded-lg px-6 py-3">
            <span className="text-md font-semibold">Active clients</span>
            <span className="text-md font-semibold">115</span>
          </div>
        </div>
      </div>
    </div>
  );
}
