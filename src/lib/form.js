import { formShape } from 'rc-form';
import createDOMForm from 'rc-form/lib/createDOMForm';

const customCreateForm = () =>
  createDOMForm({
    validateMessages: {
      required(field) {
        return 'error_required';
      },
    },
  });

export { customCreateForm as createForm };
export { formShape };