// 🎨 Màu sắc (color utilities)
type BackgroundColor = `bg-${string}`;
type TextColor = `text-${string}`;
type BorderColor = `border-${string}`;
type RingColor = `ring-${string}`;

// 📏 Kích thước
type Width = `w-${string}`;
type MinWidth = `min-w-${string}`;
type MaxWidth = `max-w-${string}`;
type Height = `h-${string}`;
type MinHeight = `min-h-${string}`;
type MaxHeight = `max-h-${string}`;

// 📦 Spacing (padding & margin)
type Padding =
  | `p-${string}`
  | `px-${string}`
  | `py-${string}`
  | `pt-${string}`
  | `pr-${string}`
  | `pb-${string}`
  | `pl-${string}`;
type Margin =
  | `m-${string}`
  | `mx-${string}`
  | `my-${string}`
  | `mt-${string}`
  | `mr-${string}`
  | `mb-${string}`
  | `ml-${string}`;

// 🔠 Font & text
type FontSize = `text-${string}`;
type FontWeight = `font-${string}`;
type FontFamily = `font-${string}`;
type TextAlign = "text-left" | "text-center" | "text-right" | "text-justify";
type TextTransform = "uppercase" | "lowercase" | "capitalize" | "normal-case";

// 🧱 Border & Radius
type Border = `border-${string}`;
type BorderRadius =
  | `rounded-${string}`
  | "rounded"
  | "rounded-none"
  | "rounded-full";

// 🌫 Shadow & Opacity
type Shadow = `shadow-${string}` | "shadow" | "shadow-none";
type Opacity = `opacity-${string}`;

// 🎭 Hiệu ứng & Transition
type Transition = `transition-${string}` | "transition";
type Duration = `duration-${string}`;
type Ease = `ease-${string}`;

// ⚡ Flexbox & Grid
type Display =
  | "flex"
  | "grid"
  | "inline-flex"
  | "block"
  | "inline-block"
  | "hidden";
type Justify =
  | "justify-start"
  | "justify-end"
  | "justify-center"
  | "justify-between"
  | "justify-around"
  | "justify-evenly";
type AlignItems =
  | "items-start"
  | "items-end"
  | "items-center"
  | "items-baseline"
  | "items-stretch";
type Gap = `gap-${string}` | `gap-x-${string}` | `gap-y-${string}`;

// 🎢 Positioning
type Position = "relative" | "absolute" | "fixed" | "sticky";
type Inset =
  | `top-${string}`
  | `right-${string}`
  | `bottom-${string}`
  | `left-${string}`
  | `inset-${string}`
  | `inset-x-${string}`
  | `inset-y-${string}`;

// 🌀 Overflow, z-index, visibility
type Overflow =
  | "overflow-hidden"
  | "overflow-visible"
  | "overflow-scroll"
  | "overflow-auto";
type ZIndex = `z-${string}`;
type Visibility = "visible" | "invisible";

// ✨ Misc
type Cursor = `cursor-${string}`;
type Select = `select-${string}`;
type PointerEvents = `pointer-events-${string}`;

// 🧩 Tổ hợp tiện dụng
interface TailwindStyleProps {
  bgColor?: BackgroundColor;
  textColor?: TextColor;
  borderColor?: BorderColor;
  width?: Width;
  height?: Height;
  padding?: Padding;
  margin?: Margin;
  rounded?: BorderRadius;
  shadow?: Shadow;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  display?: Display;
  justify?: Justify;
  align?: AlignItems;
  gap?: Gap;
  opacity?: Opacity;
}
