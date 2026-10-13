import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import SmartImage from '../common/SmartImage';

function AccordionItem({ item, open, onToggle }) {
  const panelId = `accordion-panel-${item.id}`;
  const buttonId = `accordion-button-${item.id}`;

  return (
    <div className="overflow-hidden rounded-[10px] border border-[#383838] bg-[#1a1a1a]">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-300 hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#C6A16A]"
        >
          <span className="text-[12.5px] font-medium tracking-[0.04em] text-[#f2ece8]">
            {item.title}
          </span>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-[#C6A16A]">
            {open ? <Minus size={13} strokeWidth={2} /> : <Plus size={13} strokeWidth={2} />}
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-500 ease-luxe ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-[12px] font-light leading-[1.75] text-[#bcb4ad]">
            {item.content}
          </p>
        </div>
      </div>
    </div>
  );
}

function EditorialCard({ editorial }) {
  const [activeTab, setActiveTab] = useState(editorial.tabs[0].id);
  const current = editorial.tabs.find((tab) => tab.id === activeTab) || editorial.tabs[0];

  return (
    <div className="relative overflow-hidden rounded-[8px] border border-[#383838] lg:w-[340px]">
      <div className="absolute inset-0">
        <SmartImage
          src={editorial.image}
          alt=""
          aria-hidden="true"
          className="h-full w-full"
          imgClassName="scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#8a6a33]/90 via-[#a07d3c]/78 to-[#5f4620]/90"
        />
      </div>

      <div className="relative flex flex-col p-5">
        <div className="flex items-center gap-5 border-b border-white/25 pb-2">
          {editorial.tabs.map((tab) => {
            const selected = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={selected}
                className={`relative pb-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                  selected ? 'text-[#fdf7ee]' : 'text-[#fdf7ee]/60 hover:text-[#fdf7ee]/90'
                }`}
              >
                {tab.label}
                {selected && (
                  <span className="absolute inset-x-0 -bottom-[9px] h-[1.5px] bg-[#fdf7ee]" />
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-[12px] font-light leading-[1.7] text-[#fbf3e6]">
          {current.content}
        </p>
      </div>
    </div>
  );
}

export default function ProductAccordions({ accordions, editorial }) {
  const [openId, setOpenId] = useState(accordions[0]?.id ?? null);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-6">
      <div className="flex flex-col gap-3">
        {accordions.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            open={openId === item.id}
            onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
          />
        ))}
      </div>

      <EditorialCard editorial={editorial} />
    </div>
  );
}
