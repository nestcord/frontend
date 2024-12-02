import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hash } from "lucide-react";

const channels = [
  { id: "online", name: "Online" },
  { id: "friends", name: "Friends" },
  { id: "add", name: "Add Friend" },
];

export default function ChannelTabs() {
  return (
    <section className="flex h-screen">
      <Tabs defaultValue="online" className="flex-1 flex flex-col">
        {/* Agrega posicionamiento para que esté al tope */}
        <div className="bg-neutral-800 p-2 fixed top-0 left-0 w-full z-10">
          <TabsList className="grid w-full grid-cols-3 h-12">
            {channels.map((channel) => (
              <TabsTrigger
                key={channel.id}
                value={channel.id}
                className="data-[state=active]:bg-neutral-700"
              >
                <Hash className="w-4 h-4 mr-2" />
                {channel.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {/* Agrega un padding superior para que el contenido no se solape */}
        <div className="mt-14 flex-1">
          {" "}
          {/* Ajusta el margin-top según la altura */}
          {/* Contenido adicional aquí */}
        </div>
      </Tabs>
    </section>
  );
}
