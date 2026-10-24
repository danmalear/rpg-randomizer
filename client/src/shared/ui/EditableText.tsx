import { TextInput, type TextInputProps } from '@mantine/core';

interface EditableTextProps extends React.PropsWithChildren {
	inputProps?: TextInputProps;
}

const EditableText: React.FC<EditableTextProps> = ({ inputProps }) => {
	return <TextInput {...inputProps}></TextInput>;
};

export default EditableText;
