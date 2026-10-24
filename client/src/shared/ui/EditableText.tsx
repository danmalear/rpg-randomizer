import { TextInput, type TextInputProps } from '@mantine/core';

interface EditableTextProps {
	inputProps: TextInputProps;
}

const EditableText: React.FC<EditableTextProps> = ({ inputProps }) => {
	return <TextInput {...inputProps}></TextInput>;
};

export default EditableText;
