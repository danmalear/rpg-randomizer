import { TextInput, type TextInputProps } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';

interface EditableTextProps extends React.PropsWithChildren {
	textElement?: React.ElementType;
	inputProps?: TextInputProps;
}

const EditableText: React.FC<EditableTextProps> = ({
	inputProps,
	children,
	...props
}) => {
	const [editing, setEditing] = useState(false);

	const [isEditVisible, setIsEditVisible] = useState(false);

	const TextElement = props.textElement ?? 'span';

	return editing ? (
		<TextInput {...inputProps}></TextInput>
	) : (
		<TextElement
			style={{
				cursor: 'pointer',
			}}
			onMouseEnter={() => setIsEditVisible(true)}
			onMouseLeave={() => setIsEditVisible(false)}
		>
			{children}{' '}
			<IconEdit
				style={{
					visibility: isEditVisible ? 'visible' : 'hidden',
				}}
			/>
		</TextElement>
	);
};

export default EditableText;
