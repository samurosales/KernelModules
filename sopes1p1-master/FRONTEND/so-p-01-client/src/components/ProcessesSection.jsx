import React from 'react';
import axios from 'axios';
import {Button, Icon, message, Table, Popconfirm, Row, Col, Statistic} from 'antd'

export default class ProcessesSection extends React.Component {

    constructor(props){
        super(props);
        this.state = {tableLoading:false, tableDataSource: []};
    }

    componentDidMount() {

        this.getProcesses();
    }

    getProcesses = async () => {

        this.setState({ tableLoading: true });

        try {
            const response = await axios.get('/processes');
            const processes = response.data;
            processes.forEach(p => p.key = p.pid);
            this.setState({ tableLoading: false, tableDataSource: processes });
        }
        catch (e) {
            console.log('ocurrio un error');
            console.log(e);
            message.error('ocurrio un error al obtener los procesos');

            this.setState({ tableLoading: false, tableDataSource: [] });
        }
    };

    killProcess = async (record) => {
        try {
            console.log('a punto de matar al proceso:', record.name, 'con pid:', record.pid);

            const response = await axios.get(`/kill/${record.pid}`);
            console.log(response);

            // hide();
            message.success(`Proceso '${record.name}' con pid ${record.pid} matado`);
            this.getProcesses();
        }
        catch (e) {
            console.log('ocurrio un error');
            console.log(e);
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);

            // hide();
            message.error('No se pudo matar el proceso');
        }
    };

    render() {

        const columns = [
            {
                title: 'PID',
                dataIndex: 'pid',
                key: 'key',
                onFilter: (value, record) => true
            },
            {
                title: 'Nombre',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Estado',
                dataIndex: 'state',
                key: 'state'
            },

            {
                title: 'Usuario',
                dataIndex: 'uid',
                key: 'uid'
            },

            {
                title: 'Acciones',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Popconfirm
                            title="Matar este proceso?"
                            okText="Si"
                            cancelText="No"
                            onConfirm={() => {
                                this.killProcess(record);
                            }}
                        >
                        <a><Icon type="close-circle" /> Matar</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];


        const runningCount = this.state.tableDataSource.filter(p => p.state.includes("running")).length;
        const sleepingCount = this.state.tableDataSource.filter(p => p.state.includes("sleeping")).length;
        const stoppedCount = this.state.tableDataSource.filter(p => p.state.includes("stopped")).length;
        const zombieCount = this.state.tableDataSource.filter(p => p.state.includes("zombie")).length;
        const idleCount = this.state.tableDataSource.filter(p => p.state.includes("idle")).length;
        const diskSleepCount = this.state.tableDataSource.filter(p => p.state.includes("disk sleep")).length;


        return (<div style={{ background: "white", padding: "8px" }}>

            <Row>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Statistic title="Total Procesos" value={this.state.tableDataSource.length} />
                </Col>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Statistic title="Running" value={runningCount}  />
                </Col>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Statistic title="Sleeping" value={sleepingCount}  />
                </Col>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Statistic title="Stopped" value={stoppedCount}  />
                </Col>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Statistic title="Idle" value={idleCount}  />
                </Col>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Statistic title="Disk Sleep" value={diskSleepCount}  />
                </Col>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Statistic title="Zombie" value={zombieCount}  />
                </Col>
            </Row>

            <Button onClick={this.getProcesses} >
                <Icon type="sync" />Actualizar
            </Button>
            <Table
                size="middle"
                loading={this.state.tableLoading}
                dataSource={this.state.tableDataSource}
                columns={columns}
            />
        </div>);
    }
}