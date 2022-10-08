import CustomInputNumber from "./CustomInputNumber";
import { action } from "@storybook/addon-actions";

export default {
  title: "CustomInputNumber",
  component: CustomInputNumber,
  argTypes: {},
};

const events = {
  onChange: action("onChange"),
  onBlur: action("onBlur"),
};

const Template = (args) => <CustomInputNumber {...args} {...events} />;

export const Default = Template.bind({});

Default.args = {
  disabled: false,
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
};

export const WithMinAndMax = Template.bind({});

WithMinAndMax.args = {
  min: 1,
  max: 10,
  value: 5,
  disabled: false,
};

WithMinAndMax.argTypes = {
  step: {
    table: {
      disable: true,
    },
  },
};

export const WithStep = Template.bind({});

WithStep.args = {
  min: 1,
  max: 10,
  value: 5,
  step: 3,
  disabled: false,
};
