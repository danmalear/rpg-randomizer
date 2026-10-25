import { TextInput, type TextInputProps } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import React, { useState } from 'react';

interface EditableTextProps extends React.PropsWithChildren {
	value: string;
	textElement?: React.ElementType;
	inputProps?: TextInputProps;
}

const EditableText: React.FC<EditableTextProps> = ({
	value,
	inputProps,
	...props
}) => {
	const TextElement = props.textElement ?? 'span';

	const [editing, setEditing] = useState(false);
	const [isEditVisible, setIsEditVisible] = useState(false);

	// #region Text mode

	const onClick = () => {
		setEditing(true);
		setIsEditVisible(false);
	};

	// #endregion Text mode

	// #region Editing mode

	const [editingValue, setEditingValue] = useState(value);
	const onChange: React.ChangeEventHandler<
		HTMLInputElement,
		HTMLInputElement
	> = (e) => {
		setEditingValue(e.currentTarget.value);
	};

	const cancelEdit = () => {
		setEditing(false);
		setEditingValue(value);
	};

	const handleEscPressed = cancelEdit;

	const ref = useClickOutside(cancelEdit);

	// #endregion Editing mode

	return editing ? (
		<TextInput
			autoFocus
			ref={ref}
			value={editingValue}
			onChange={onChange}
			{...inputProps}
			onKeyUp={(e) => {
				switch (e.key) {
					case 'Escape':
						handleEscPressed();
						break;
					default:
						console.log(`${e.key} pressed - unhandled`);
				}
			}}
		/>
	) : (
		<TextElement
			style={{
				cursor: 'pointer',
			}}
			onMouseEnter={() => setIsEditVisible(true)}
			onMouseLeave={() => setIsEditVisible(false)}
			onClick={onClick}
		>
			{value}{' '}
			<IconEdit
				style={{
					visibility: isEditVisible ? 'visible' : 'hidden',
				}}
			/>
		</TextElement>
	);
};

export default EditableText;
