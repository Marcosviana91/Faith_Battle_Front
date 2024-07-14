import { TextInput, type TextInputProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextInputProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'button_txtInput');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const color = useThemeColor({ light: "#2f3235", dark: "#bebebe" }, 'text');
  const coloselectionColorr = useThemeColor({ light: "#bebebe", dark: "#2f3235" }, 'text');

  return (
    <TextInput
      cursorColor={color}
      selectionColor={coloselectionColorr}
      style={[
        { backgroundColor, borderColor, color },
        styles.textInput,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 32,
    borderRadius: 8,
    paddingHorizontal: 8,
    minWidth: 200,
    maxWidth: "80%",
    borderWidth: 1,
  }
});
