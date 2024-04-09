export default function useMouseMove(): {
    x: import("vue").Ref<number>;
    y: import("vue").Ref<number>;
    moving: import("vue").Ref<boolean>;
    on: () => void;
    off: () => void;
};
