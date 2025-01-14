import React, { useEffect, useRef, useState, useReducer } from 'react';
import '../ActivityPanels/ActivityLevels.less';
import { message, Spin, Row, Col, Alert, Dropdown, Menu } from 'antd';
import CodeModal from '../ActivityPanels/BlocklyCanvasPanel/modals/CodeModal';
import ConsoleModal from '../ActivityPanels/BlocklyCanvasPanel/modals/ConsoleModal';
import PlotterModal from '../ActivityPanels/BlocklyCanvasPanel/modals/PlotterModal';
import {
    handleCloseConnection,
    handleOpenConnection,
} from '../ActivityPanels/Utils/consoleHelpers';
import ArduinoLogo from '../ActivityPanels/BlocklyCanvasPanel/Icons/ArduinoLogo';
import PlotterLogo from '../ActivityPanels/BlocklyCanvasPanel/Icons/PlotterLogo';
import { useNavigate } from 'react-router-dom';
import GalleryObjectForm from './GalleryObjectForm';
import './GalleryCanvas.less';
import Toolbox from './Toolbox.json';
//import the entire toolbox from the json file, since we don't store an Activity object

let plotId = 1;

export default function GalleryCanvas({ editing }) {
    const [hoverSave, setHoverSave] = useState(false);
    const [hoverUndo, setHoverUndo] = useState(false);
    const [hoverRedo, setHoverRedo] = useState(false);
    const [hoverCompile, setHoverCompile] = useState(false);
    const [hoverConsole, setHoverConsole] = useState(false);
    const [showConsole, setShowConsole] = useState(false);
    const [showPlotter, setShowPlotter] = useState(false);
    const [plotData, setPlotData] = useState([]);
    const [connectionOpen, setConnectionOpen] = useState(false);
    const [selectedCompile, setSelectedCompile] = useState(false);
    const [compileError, setCompileError] = useState('');
    const [lastSavedTime, setLastSavedTime] = useState(null);

    const [forceUpdate] = useReducer((x) => x + 1, 0);
    const navigate = useNavigate();
    const workspaceRef = useRef(null);

    const replayRef = useRef([]);
    const clicks = useRef(0);

    const setWorkspace = () => {
        workspaceRef.current = window.Blockly.inject('blockly-canvas', {
            toolbox: document.getElementById('toolbox'),
        });
        window.Blockly.addChangeListener(blocklyEvent);
    };

    const pushEvent = (type, blockId = '') => {
        let blockType = '';
        if (blockId !== '') {
            let type = window.Blockly.mainWorkspace.getBlockById(blockId)?.type;
            type ? blockType = type : blockType = '';
        }

        let xml = window.Blockly.Xml.workspaceToDom(workspaceRef.current);
        let xml_text = window.Blockly.Xml.domToText(xml);
        replayRef.current.push({
            xml: xml_text,
            action: type,
            blockId: blockId,
            blockType: blockType,
            timestamp: Date.now(),
            clicks: clicks.current,
        });
    };

    let blocked = false;
    const blocklyEvent = (event) => {
        // if it is a click event, add click
        if (
            (event.type === 'ui' && event.element === 'click') ||
            event.element === 'selected'
        ) {
            clicks.current++;
        }

        // if it is other ui events or create events or is [undo, redo], return
        if (event.type === 'ui' || !event.recordUndo) {
            return;
        }

        // if event is in timeout, return
        if (event.type === 'change' && blocked) {
            return;
        }

        // if the event is change field value, only accept the latest change
        if (
            event.type === 'change' &&
            event.element === 'field' &&
            replayRef.current.length > 1 &&
            replayRef.current[replayRef.current.length - 1].action ===
            'change field' &&
            replayRef.current[replayRef.current.length - 1].blockId === event.blockId
        ) {
            replayRef.current.pop();
        }

        // event delete always comes after a move, ignore the move
        if (event.type === 'delete') {
            if (replayRef.current[replayRef.current.length - 1].action === 'move') {
                replayRef.current.pop();
            }
        }

        // if event is change, add the detail action type
        if (event.type === 'change' && event.element) {
            pushEvent(`${event.type} ${event.element}`, event.blockId);
        } else {
            pushEvent(event.type, event.blockId);
        }

        // timeout for half a second
        blocked = true;
        setTimeout(() => {
            blocked = false;
        }, 500);
    };

    useEffect(() => {
        // once the activity state is set, set the workspace and save
        const setUp = async () => {
            // activityRef.current = activity;
            if (localStorage.getItem('gallery-xml')) {
                setWorkspace();

                let onLoadSave = null;

                if (localStorage.getItem('gallery-xml')) {
                    let xml = window.Blockly.Xml.textToDom(localStorage.getItem('gallery-xml'));
                    window.Blockly.Xml.domToWorkspace(xml, workspaceRef.current);
                    replayRef.current = onLoadSave.replay;
                    setLastSavedTime(getFormattedDate(onLoadSave.updated_at));
                }

                pushEvent('load workspace');
                workspaceRef.current.clearUndo();
            }
        };
        setUp();
    }, [localStorage.getItem('gallery-xml')]);

    const handleManualSave = async () => {
        alert("Saving is not currently supported for forked projects.")
    };

    const handleUndo = () => {
        if (workspaceRef.current.undoStack_.length > 0) {
            workspaceRef.current.undo(false);
            pushEvent('undo');
        }
    };

    const handleRedo = () => {
        if (workspaceRef.current.redoStack_.length > 0) {
            workspaceRef.current.undo(true);
            pushEvent('redo');
        }
    };

    const handleConsole = async () => {
        if (showPlotter) {
            message.warning('Close serial plotter before openning serial monitor');
            return;
        }
        // if serial monitor is not shown
        if (!showConsole) {
            // connect to port
            await handleOpenConnection(9600, 'newLine');
            // if fail to connect to port, return
            if (typeof window['port'] === 'undefined') {
                message.error('Fail to select serial device');
                return;
            }
            setConnectionOpen(true);
            setShowConsole(true);
            pushEvent('show serial monitor');
        }
        // if serial monitor is shown, close the connection
        else {
            if (connectionOpen) {
                await handleCloseConnection();
                setConnectionOpen(false);
            }
            setShowConsole(false);
        }
    };

    const handlePlotter = async () => {
        if (showConsole) {
            message.warning('Close serial monitor before openning serial plotter');
            return;
        }

        if (!showPlotter) {
            await handleOpenConnection(
                9600,
                'plot',
                plotData,
                setPlotData,
                plotId,
                forceUpdate
            );
            if (typeof window['port'] === 'undefined') {
                message.error('Fail to select serial device');
                return;
            }
            setConnectionOpen(true);
            setShowPlotter(true);
            pushEvent('show serial plotter');
        } else {
            plotId = 1;
            if (connectionOpen) {
                await handleCloseConnection();
                setConnectionOpen(false);
            }
            setShowPlotter(false);
        }
    };
    const handleCompile = async () => {
        alert("Compiling is not currently supported for forked projects.")
    };

    const handleGoBack = () => {
        if (
            window.confirm(
                'All unsaved progress will be lost. Do you still want to go back?'
            )
        )
            navigate(-1);
    };

    const getFormattedDate = (value, locale = 'en-US') => {
        let output = new Date(value).toLocaleDateString(locale);
        return output + ' ' + new Date(value).toLocaleTimeString(locale);
    };

    const menu = (
        <Menu>
            <Menu.Item onClick={handlePlotter}>
                <PlotterLogo />
                &nbsp; Show Serial Plotter
            </Menu.Item>
            <Menu.Item>
                <CodeModal title={'Arduino Code'} workspaceRef={workspaceRef.current} />
            </Menu.Item>
        </Menu>
    );

    const [controls, setControls] = useState([]);
    useEffect(() => {
        if (editing) {
            setControls(<Row id='icon-control-panel'>
                <Col flex='auto'>
                    <Row align='middle' justify='end' id='description-container'>
                        <Col flex={'300px'}>
                            {lastSavedTime ? `Last changes saved ${lastSavedTime}` : ''}
                        </Col>
                        <Col flex={'350px'}>
                            <Row>
                                <Col className='flex flex-row' id='icon-align'>
                                    <button
                                        onClick={handleManualSave}
                                        id='link'
                                        className='flex flex-column'
                                    >
                                        <i
                                            id='icon-btn'
                                            className='fa fa-save'
                                            onMouseEnter={() => setHoverSave(true)}
                                            onMouseLeave={() => setHoverSave(false)}
                                        />
                                        {hoverSave && (
                                            <div className='popup ModalCompile4'>Save</div>
                                        )}
                                    </button>
                                </Col>

                                <Col className='flex flex-row' id='icon-align'>
                                    <button
                                        onClick={handleUndo}
                                        id='link'
                                        className='flex flex-column'
                                    >
                                        <i
                                            id='icon-btn'
                                            className='fa fa-undo-alt'
                                            style={
                                                workspaceRef.current
                                                    ? workspaceRef.current.undoStack_.length < 1
                                                        ? { color: 'grey', cursor: 'default' }
                                                        : null
                                                    : null
                                            }
                                            onMouseEnter={() => setHoverUndo(true)}
                                            onMouseLeave={() => setHoverUndo(false)}
                                        />
                                        {hoverUndo && (
                                            <div className='popup ModalCompile4'>Undo</div>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleRedo}
                                        id='link'
                                        className='flex flex-column'
                                    >
                                        <i
                                            id='icon-btn'
                                            className='fa fa-redo-alt'
                                            style={
                                                workspaceRef.current
                                                    ? workspaceRef.current.redoStack_.length < 1
                                                        ? { color: 'grey', cursor: 'default' }
                                                        : null
                                                    : null
                                            }
                                            onMouseEnter={() => setHoverRedo(true)}
                                            onMouseLeave={() => setHoverRedo(false)}
                                        />
                                        {hoverRedo && (
                                            <div className='popup ModalCompile4'>Redo</div>
                                        )}
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                        <GalleryObjectForm workspaceRef={workspaceRef} />
                        <Col flex={'180px'}>
                            <div
                                id='action-btn-container'
                                className='flex space-around'
                            >
                                <ArduinoLogo
                                    setHoverCompile={setHoverCompile}
                                    handleCompile={handleCompile}
                                />
                                {hoverCompile && (
                                    <div className='popup ModalCompile'>
                                        Upload to Arduino
                                    </div>
                                )}
                                {/* <DisplayDiagramModal
                            image={activity.images}
                        /> */}
                                <i
                                    onClick={() => handleConsole()}
                                    className='fas fa-terminal hvr-info'
                                    style={{ marginLeft: '6px' }}
                                    onMouseEnter={() => setHoverConsole(true)}
                                    onMouseLeave={() => setHoverConsole(false)}
                                />
                                {hoverConsole && (
                                    <div className='popup ModalCompile'>
                                        Show Serial Monitor
                                    </div>
                                )}
                                <Dropdown overlay={menu}>
                                    <i className='fas fa-ellipsis-v'></i>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>);
            document.querySelector(".blocklyToolboxDiv")?.classList.remove("hide-toolbox");

        }
        else {
            setControls([]);
            document.querySelector(".blocklyToolboxDiv")?.classList.add("hide-toolbox");
        }
    }, [editing]);

    return (
        <>
            <div className='flex flex-row'>
                <div
                    id='bottom-container'
                    className='flex flex-column vertical-container overflow-visible'
                >
                    <Spin
                        tip='Compiling Code Please Wait... It may take up to 20 seconds to compile your code.'
                        className='compilePop'
                        size='large'
                        spinning={selectedCompile}
                    >
                        {controls}
                        <div id='blockly-canvas' />
                    </Spin>
                </div>

                <ConsoleModal
                    show={showConsole}
                    connectionOpen={connectionOpen}
                    setConnectionOpen={setConnectionOpen}
                ></ConsoleModal>
                <PlotterModal
                    show={showPlotter}
                    connectionOpen={connectionOpen}
                    setConnectionOpen={setConnectionOpen}
                    plotData={plotData}
                    setPlotData={setPlotData}
                    plotId={plotId}
                />
            </div>

            {/* This xml is for the blocks' menu we will provide. Here are examples on how to include categories and subcategories */}
            <xml id='toolbox' is='Blockly workspace'>
                {
                    // Maps out block categories
                    Toolbox &&
                    Toolbox.map(([category, blocks]) => (
                        <category name={category} is='Blockly category' key={category}>
                            {
                                // maps out blocks in category
                                // eslint-disable-next-line
                                blocks.map((block) => {
                                    return (
                                        <block
                                            type={block.name}
                                            is='Blockly block'
                                            key={block.name}
                                        />
                                    );
                                })
                            }
                        </category>
                    ))
                }
            </xml>

            {compileError && (
                <Alert
                    message={compileError}
                    type='error'
                    closable
                    onClose={(e) => setCompileError('')}
                ></Alert>
            )}
        </>
    );
}
