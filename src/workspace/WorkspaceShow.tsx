import * as React from 'react';
import {
	ArrayField,
	Button,
	ChipField, ImageField,
	NumberField,
	Show,
	SimpleShowLayout, SingleFieldList,
	TextField,
	useRecordContext,
	useRefresh
} from "react-admin";
import axios from "axios";

enum Status {
	APPROVED = 'approved',
	CANCELED = 'canceled',
}

const apiUrl = process.env.REACT_APP_API_URL;

const Title = () => {
	const record = useRecordContext();
	if (!record) return null;
	return <span>Коворкинг "{record.title}"</span>;
};

const setStatus = async (code_name: Status, workspace_id: any) => {
	const token = localStorage.getItem('access-token') || '';

	const params = {
		workspace_id,
		code_name,
	}

	return await axios.put(
		`${apiUrl}/service/set_status`,
		{},
		{
			params,
			headers: {
				Authorization: token,
			},
		});
}

const SetStatusButtons = () => {
	const record = useRecordContext();
	const refresh = useRefresh();

	if (!record) {
		return null;
	}

	const approve = () => {
		setStatus(Status.APPROVED, record.id).then(refresh);
	}

	const cancel = () => {
		setStatus(Status.CANCELED, record.id).then(refresh);
	}

	return (
		<div style={{display: 'flex', gap: 20, flexDirection: 'column'}}>
			<div>
				Нажмите <strong>Подтвердить</strong>, чтобы одобрить коворкинг и он стал доступен для бронирования
				<br/>
				Нажмите <strong>Отклонить</strong>, если есть замечания по содержанию и нужна доработка
			</div>
			<div style={{display:'flex', flexDirection: 'row', gap: 20}}>
				<Button
					type={'button'}
					onClick={approve}
					variant={'contained'}
				>
					<span>Подтвердить</span>
				</Button>
				<Button
					type={'button'}
					onClick={cancel}
					variant={'outlined'}
				>
					<span>Отклонить</span>
				</Button>
			</div>
		</div>
	);
}

const WorkspaceShow: React.FC = () => {
    return (
        <Show title={<Title />}>
			<SimpleShowLayout>
				<TextField source="title" label={'Название'}/>
				<TextField source="description" label={'Описание'}/>
				<TextField source="location_value" label={'Адрес'}/>
				<TextField source={"site_url"} label={'Сайт'}/>
				<TextField source={"phone_number"} label={'Номер телефона'}/>
				<ImageField source={"images"} src={'media.link'}/>
				<NumberField source={'rating'} label={'Рейтинг'}/>
				<ArrayField source="parameters" label={'Параметры'}>
					<SingleFieldList>
						<ChipField source="name" size="small" />
					</SingleFieldList>
				</ArrayField>
				<TextField source="status.name" label={'Cтатус'}/>

				<SetStatusButtons />
			</SimpleShowLayout>
        </Show>
    );
};

export default WorkspaceShow;