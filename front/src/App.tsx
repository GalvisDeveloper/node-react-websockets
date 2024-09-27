import { FormEvent, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import './App.css';

const socketUrl = 'ws://localhost:3000';

function App() {
	const [message, setMessage] = useState('');
	const [arrMessages, setArrMessages] = useState<string[]>([]);

	const { sendMessage } = useWebSocket(socketUrl, {
		onOpen: () => console.log('opened'),
		onMessage: (e) => {
			const payload = JSON.parse(e.data);
			console.log(payload);
			setArrMessages([...arrMessages, payload.data]);
		},
		//Will attempt to reconnect on all close events, such as server shutting down
		// shouldReconnect: (closeEvent) => true,
	});

	const send = (e: FormEvent) => {
		e.preventDefault();
		sendMessage(message);
		setMessage('');
	};

	return (
		<>
			<h1>Websockets</h1>
			<form onSubmit={send}>
				<input type='text' placeholder='Send message' value={message} onChange={(e) => setMessage(e.target.value)} />
				<button type='submit'>Send</button>
			</form>

			{arrMessages.length > 0 && (
				<ul id='messages'>
					{arrMessages.map((msg, index) => (
						<li key={index}>{msg}</li>
					))}
				</ul>
			)}
		</>
	);
}

export default App;
