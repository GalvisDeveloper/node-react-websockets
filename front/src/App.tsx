import { FormEvent, useEffect, useState } from 'react';
import './App.css';

function App() {
	const [message, setMessage] = useState('');
	const [arrMessages, setArrMessages] = useState<string[]>([]);

	const socket = new WebSocket('ws://localhost:3000');

	useEffect(() => {
		socket.onopen = (e) => {
			console.log(e);
			console.log('Connected');
		};

		socket.onclose = (e) => {
			console.log(e);
			console.log('Disconnected');
		};
	}, []);

	useEffect(() => {
		socket.onmessage = (e) => {
			const payload = JSON.parse(e.data);
			setArrMessages([...arrMessages, payload.data]);
		};
	}, [socket]);

	const sendMessage = (e: FormEvent) => {
		e.preventDefault();
		socket.send(message);
		setMessage('');
	};

	return (
		<>
			<h1>Websockets</h1>
			<form onSubmit={sendMessage}>
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
