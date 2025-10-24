import { AnchorHeading, useAnchorScroll } from "@/components/AnchorHeading";
import QueryUptimeNotification from "@/Images/Query Server Uptime Notification.png";
import QueryUptimeWindow from "@/Images/Query Server Uptime Window.png";
import PlaytimeCounterImg from "@/Images/Playtime Counter.png";
import TaskbarIcon from "@/Images/Taskbar Icon.png";
import TopBarIcon from "@/Images/TopBar Icon.png";
import InstanceClosure from "@/Images/Instance Closure.png";
import CustomCursorSet from "@/Images/Custom Cursor Set.png";
import ModGeneratorImg from "@/Images/Mod Generator.png";

const Features = () => {
  useAnchorScroll();

  return (
    <div className="prose prose-invert max-w-none">

      {/* Query Server Uptime */}
      <hr className="border-t border-white/20 my-8" />
      <AnchorHeading id="features" level={1}>
        Query Server Uptime
      </AnchorHeading>
      <p>
        Displays the server’s estimated uptime using the <strong>RoValra API</strong>.
        This feature shows how long the server has been online, helping monitor
        server stability and uptime.
      </p>
      <div className="flex flex-row gap-4 mt-4 h-64">
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <img
            src={QueryUptimeNotification}
            alt="Query Server Uptime Notification"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <img
            src={QueryUptimeWindow}
            alt="Query Server Uptime Window"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Playtime Counter */}
      <hr className="border-t border-white/20 my-8" />
      <AnchorHeading id="playtime-counter" level={1}>
        Playtime Counter
      </AnchorHeading>
      <p>
        Displays the <strong>total playtime</strong> as well as the <strong>current game's playtime</strong>.
        This helps users track how long they’ve played overall and per session.
      </p>
      <div className="flex justify-center mt-4">
        <img
          src={PlaytimeCounterImg}
          alt="Playtime Counter"
          className="max-w-[400px] h-auto rounded-xl shadow-md"
        />
      </div>

      {/* Taskbar Icon */}
      <hr className="border-t border-white/20 my-8" />
      <AnchorHeading id="taskbar-icon" level={1}>
        Taskbar Icon
      </AnchorHeading>
      <p>
        Reverts the topbar/taskbar Roblox icon to the selected icon.  
        <strong>Note:</strong> This feature will not work if Roblox takes over 7 seconds to launch.
      </p>
      <div className="flex flex-row gap-4 mt-4 justify-center">
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <img
            src={TaskbarIcon}
            alt="Taskbar Icon"
            className="max-w-[300px] h-auto object-contain rounded-xl shadow-md"
          />
        </div>
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <img
            src={TopBarIcon}
            alt="TopBar Icon"
            className="max-w-[300px] h-auto object-contain rounded-xl shadow-md"
          />
        </div>
      </div>

      {/* Instance Launch Confirmation */}
      <hr className="border-t border-white/20 my-8" />
      <AnchorHeading id="instance-launch" level={1}>
        Instance Launch Confirmation
      </AnchorHeading>
      <p>
        Prevents closure of Roblox player when accidentally launching Roblox again.
      </p>
      <div className="flex justify-center mt-4">
        <img
          src={InstanceClosure}
          alt="Instance Launch Confirmation"
          className="max-w-[400px] h-auto rounded-xl shadow-md"
        />
      </div>

      {/* Custom Cursor Sets */}
      <hr className="border-t border-white/20 my-8" />
      <AnchorHeading id="custom-cursor-sets" level={1}>
        Custom Cursor Sets
      </AnchorHeading>
      <p>
        Create multiple cursor profiles with 4 button actions:  
        <strong>Apply Set</strong> – applies the cursors,  
        <strong>Fetch Set</strong> – grabs the cursors from the mods folder,  
        <strong>Import</strong> and <strong>Export</strong>.
      </p>
      <div className="flex justify-center mt-4">
        <img
          src={CustomCursorSet}
          alt="Custom Cursor Set"
          className="max-w-full h-auto rounded-xl shadow-md"
        />
      </div>

      {/* Mod Generator */}
      <hr className="border-t border-white/20 my-8" />
      <AnchorHeading id="mod-generator" level={1}>
        Mod Generator
      </AnchorHeading>
      <p>
        Effortlessly create Roblox mods with single or gradient colors using the <strong>Mod Generator</strong>. 
        This tool is fully up-to-date and never becomes outdated, allowing you to customize your game’s appearance with ease.      </p>
      <div className="flex justify-center mt-4">
        <img
          src={ModGeneratorImg}
          alt="Mod Generator"
          className="max-w-full h-auto rounded-xl shadow-md"
        />
      </div>

    </div>
  );
};

export default Features;
