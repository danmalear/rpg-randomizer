import {
	ActionIcon,
	Group,
	TextInput,
	useMantineTheme,
	type TextInputProps,
} from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { IconCheck, IconEdit, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';

interface EditableTextProps extends React.PropsWithChildren {
	value: string;
	onSubmit: (value: string) => void;
	textElement?: React.ElementType;
	inputProps?: TextInputProps;
}

const EditableText: React.FC<EditableTextProps> = ({
	value,
	onSubmit: emitSubmit,
	inputProps,
	...props
}) => {
	const theme = useMantineTheme();
	const [editing, setEditing] = useState(false);

	// #region Text mode

	const TextElement = props.textElement ?? 'span';

	const [isEditVisible, setIsEditVisible] = useState(false);

	const onClick = () => {
		setEditing(true);
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

	const confirmEdit = () => {
		setEditing(false);
		emitSubmit(editingValue);
	};

	const cancelEdit = () => {
		setEditing(false);
		setEditingValue(value);
	};

	const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
	const [actionIconsRef, setActionIconsRef] = useState<HTMLDivElement | null>(
		null,
	);

	const actionIcons = (
		<div ref={setActionIconsRef}>
			<Group gap="xs">
				<ActionIcon variant="transparent" onClick={confirmEdit}>
					<IconCheck color={theme.colors.green[2]} />
				</ActionIcon>
				<ActionIcon variant="transparent" onClick={cancelEdit}>
					<IconX color={theme.colors.red[2]} />
				</ActionIcon>
			</Group>
		</div>
	);

	const handleEnterPressed = confirmEdit;

	const handleEscPressed = cancelEdit;
	useClickOutside(cancelEdit, undefined, [inputRef, actionIconsRef]);

	// #endregion Editing mode

	return editing ? (
		<TextInput
			autoFocus
			ref={setInputRef}
			value={editingValue}
			rightSectionWidth={100}
			rightSection={actionIcons}
			rightSectionPointerEvents="all"
			onMouseEnter={() => setIsEditVisible(true)}
			onMouseLeave={() => setIsEditVisible(false)}
			onChange={onChange}
			{...inputProps}
			onKeyUp={(e) => {
				switch (e.key) {
					case 'Escape':
						handleEscPressed();
						break;
					case 'Enter':
						handleEnterPressed();
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
