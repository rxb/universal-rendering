// partial dirty implementation of react-native Picker
// should match http://facebook.github.io/react-native/docs/picker.html

// https://github.com/necolas/react-native-web/issues/184
import React from "react"
import createDOMElement from "react-native-web/dist/modules/createDOMElement"

const PickerItem = (props: PropsType) => {
  const { value, label } = props;
  return (
    <option value={ value }>
      { label }
    </option>
  )
}

const handleValueChange = (
  children: ?Array<React$Element<any>>,
  cb: Function,
) => (event: SyntheticEvent) => {
  if (children && event.target && event.target.value !== undefined) {
    const value = event.target.value
    return children.some((child, index) => {
      return (
        child.props.value === value &&
        cb(value, index)
      )
    })
  }
  return null
}

const Picker = (props: PropsType) => {
  const { selectedValue, onValueChange, children, ...otherProps } = props
  return (
    createDOMElement("select", {
      className: 'input',
      value: selectedValue,
      onChange: handleValueChange(children, onValueChange),
      ...otherProps,
      children,
    })
  )
}

Picker.Item = PickerItem

export default Picker