import { redirect } from 'next/navigation';

export default function App() {
	// For now, consider /prescriptions is a root path of the application, thus redirecting there
	redirect('/prescriptions');
}
