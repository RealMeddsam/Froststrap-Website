import { AnchorHeading, useAnchorScroll } from "@/components/AnchorHeading";
import FRMQualityOverrideImg from "@/Images/FRMQualityOverride.png";

const FastFlags = () => {
  useAnchorScroll();

  return (
    <div className="prose prose-invert max-w-none">
      <AnchorHeading id="frm-quality-override" level={1}>
        FRM Quality Override
      </AnchorHeading>

      <p>
        This FastFlag will cap your graphic settings at <strong>level 1</strong> (you can change the{" "}
        <code>1</code> to any other graphic level you want it to be set to). To resolve the render
        distance issue, go to <strong>Settings → Graphics</strong> and move the graphics quality
        slider to the <strong>highest setting available</strong>. After that, your render distance
        issue will be resolved — only your render distance will be affected, while other graphics
        settings, including textures, will remain unchanged.
      </p>

      <div className="flex justify-center mt-4">
        <img
          src={FRMQualityOverrideImg}
          alt="FRM Quality Override Example"
          className="max-w-[600px] h-auto rounded-xl shadow-md"
        />
      </div>

      <hr className="border-t border-white/20 my-8" />
      <AnchorHeading id="rendering-modes" level={1}>
        Rendering Modes
      </AnchorHeading>

      <p>
        This manages the Roblox API used for rendering. Experiment with them to see which works best
        for your system:
      </p>

      <ul>
        <li>
          <strong>D3D11</strong> – Default mode.
        </li>
        <li>
          <strong>D3D10</strong> – Better for older PCs.
        </li>
        <li>
          <strong>Vulkan</strong> – Better for newer GPUs, though it may cause crashes on some
          systems.
        </li>
      </ul>

      <hr className="border-t border-white/20 my-8" />
      <AnchorHeading id="msaa" level={1}>
        MSAA
      </AnchorHeading>

      <p>
        Controls the number of samples used for <strong>anti-aliasing</strong>. This setting is only
        effective at <strong>high graphical levels</strong>. Values between <strong>1 and 4</strong>{" "}
        are recommended, as lower or higher values can cause visual issues or performance problems.
      </p>

      <hr className="border-t border-white/20 my-8" />
      <AnchorHeading id="csg" level={1}>
        CSG
      </AnchorHeading>

      <p>
        This controls <strong>Constructive Solid Geometry (CSG)</strong> rendering. Lower values
        reduce the detail switching distance, meaning less detail is shown when you’re farther away.
        Higher values increase detail at the cost of <strong>FPS</strong>.
      </p>
    </div>
  );
};

export default FastFlags;
