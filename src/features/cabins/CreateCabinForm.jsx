import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";



function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {

  const { id: editId, ...editValues } = cabinToEdit;

  const isEditableForm = Boolean(editId);

  const { isCreating, createCabinMutate } = useCreateCabin();

  const { isEditing, editCabinMutate } = useEditCabin()

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditableForm ? editValues : '',
  });

  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  function onFormSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditableForm) {
      editCabinMutate({
        editableCabin: { ...data, image },
        id: editId
      }, {
        onSuccess: (updatedFormData) => {
          reset(updatedFormData);
          onCloseModal?.() ///  this mean if onCloseModal is null then it will not call the fuinction ()
        }
      });
      return;
    }
    createCabinMutate({ ...data, image }, {
      onSuccess: () => {
        reset();
        onCloseModal?.()
      }
    });
  }

  function onError(errors) { }


  return (
    <Form onSubmit={handleSubmit(onFormSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register('name', {
          required: 'This field is required'
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register('maxCapacity', {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Capacity should be at least 1'
          }
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register('regularPrice', {
          required: 'This field is required', min: {
            value: 1,
            message: 'Capacity should be at least 1'
          }
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register('discount', {
          required: 'This field is required',
          validate: (curValue) => parseInt(curValue) <= parseInt(getValues().regularPrice)
            || 'Discount should be less than regular price'
        })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register('description', {
          required: 'This field is required'
        })} />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register('image', {
          required: isEditableForm ? false : 'Image is required'
        })} disabled={isWorking} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditableForm ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
