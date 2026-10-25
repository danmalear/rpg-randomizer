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
	textElement?: React.ElementType;
	inputProps?: TextInputProps;
}

const EditableText: React.FC<EditableTextProps> = ({
	value,
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
				<ActionIcon
					variant="transparent"
					onClick={() => alert('check clicked')}
				>
					<IconCheck color={theme.colors.green[2]} />
				</ActionIcon>
				<ActionIcon variant="transparent" onClick={cancelEdit}>
					<IconX color={theme.colors.red[2]} />
				</ActionIcon>
			</Group>
		</div>
	);

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
