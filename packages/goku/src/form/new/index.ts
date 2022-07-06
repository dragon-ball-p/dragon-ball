import { Form } from './form';
import { FormItem } from './form-item';
import { useForm } from './hooks/useForm';

export { FormProps } from './form';
export { FormItemProps } from './form-item';
export { FormStore } from './store';

type FormInterface = {
  Item: typeof FormItem;
  useForm: typeof useForm;
};

const OuterForm = Form as FormInterface & typeof Form;
OuterForm.Item = FormItem;
OuterForm.useForm = useForm;

export { Form, FormItem, useForm };
export default Form;
