# Incoming Messages Animation

A React Native app demonstrating animated incoming messages with iOS 26 liquid glass effects.

## Prerequisites

- React Native 0.80+
- Xcode 26+
- iOS 26 Simulator or device (liquid glass is unavailable on older iOS versions)
- Cannot use Expo Go. Must use a development build (`npx expo run:ios`).

---

## Background Image with Blur

Use `ImageBackground` from `react-native` to set a full-screen background image. The `blurRadius` prop applies a Gaussian blur.

### Import

```tsx
import { ImageBackground } from 'react-native';
```

### Usage

```tsx
<ImageBackground
  source={require('../assets/bg.jpg')}
  style={{ flex: 1 }}
  blurRadius={12}
>
  {/* child content renders on top of the image */}
</ImageBackground>
```

### Props Reference

| Prop         | Type              | Description                                      |
|--------------|-------------------|--------------------------------------------------|
| `source`     | `ImageSourcePropType` | Local asset via `require()` or remote `{ uri }`. |
| `style`      | `ViewStyle`       | Applied to the outer container. Use `flex: 1` to fill the screen. |
| `blurRadius` | `number`          | Blur intensity in logical pixels. `0` = no blur, `12` = moderate, `25`+ = heavy. |
| `resizeMode` | `string`          | `'cover'` (default), `'contain'`, `'stretch'`, `'center'`. |

### Notes

- Asset file extensions are case-sensitive in Metro bundler. Use lowercase (`.jpg`, not `.JPG`).
- `ImageBackground` is a wrapper around `<Image>` inside a `<View>`. It renders the image behind its children.

---

## Liquid Glass Effect

The `@callstack/liquid-glass` library provides the iOS 26 liquid glass material effect.

### Installation

```bash
npm install @callstack/liquid-glass
```

Then rebuild the native app (this library contains native iOS code):

```bash
npx expo run:ios
```

### Import

```tsx
import { LiquidGlassView } from '@callstack/liquid-glass';
```

### Basic Usage

Wrap any content in `LiquidGlassView`. It behaves like a standard `View` but renders the glass material behind its children.

```tsx
<LiquidGlassView
  effect="clear"
  style={{
    padding: 8,
    borderRadius: 8,
  }}
>
  <Text style={{ color: 'white' }}>
    This text sits on top of liquid glass.
  </Text>
</LiquidGlassView>
```

### Props Reference

| Prop              | Type                               | Default      | Description |
|-------------------|------------------------------------|--------------|-------------|
| `effect`          | `'clear'` \| `'regular'` \| `'none'` | `'regular'`  | `clear` = more transparent glass. `regular` = frosted/opaque glass. `none` = no effect. |
| `interactive`     | `boolean`                          | `false`      | Adds a press interaction effect when the user taps the view. Only set on mount. |
| `tintColor`       | `ColorValue`                       | `undefined`  | Tint overlay color applied to the glass. |
| `colorScheme`     | `'light'` \| `'dark'` \| `'system'`  | `'system'`   | Controls light/dark appearance of the glass material. |
| `animated`        | `boolean`                          | `true`       | Whether effect changes animate. |
| `animationDuration` | `number`                         | `undefined`  | Duration of the glass effect animation in milliseconds. |

### Choosing Between `clear` and `regular`

- Use `effect="clear"` when the glass sits over a background image or colorful content. It produces a transparent, refractive look closer to Apple's native implementation.
- Use `effect="regular"` (default) for a more opaque, frosted appearance. This works better over plain or dark backgrounds.

### Merging Multiple Glass Elements

Use `LiquidGlassContainerView` to merge nearby glass views into a single combined effect:

```tsx
import { LiquidGlassContainerView, LiquidGlassView } from '@callstack/liquid-glass';

<LiquidGlassContainerView spacing={20}>
  <LiquidGlassView style={{ width: 100, height: 100, borderRadius: 50 }} />
  <LiquidGlassView style={{ width: 100, height: 100, borderRadius: 50 }} />
</LiquidGlassContainerView>
```

The `spacing` prop defines the distance between elements at which they begin merging their glass effects.

### Fallback on Unsupported Devices

On iOS versions below 26, `LiquidGlassView` renders as a plain `View`. Use `isLiquidGlassSupported` to provide a fallback background:

```tsx
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';

<LiquidGlassView
  style={[
    { padding: 16, borderRadius: 12 },
    !isLiquidGlassSupported && { backgroundColor: 'rgba(255,255,255,0.3)' },
  ]}
>
  <Text>Content</Text>
</LiquidGlassView>
```

---

## Running the App

This app uses native modules. Expo Go will not work.

```bash
# Install dependencies
npm install

# Build and run on iOS Simulator (compiles native code, runs pod install)
npx expo run:ios
```

To start the dev server after an initial build:

```bash
npx expo start --dev-client
```
