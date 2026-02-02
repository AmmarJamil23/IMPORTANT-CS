import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log("UI Error", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="bg-gray-900 rounded-lg p-4 text-red-400">
                    <p className="font-semibold">
                        Component failed to render
                    </p>
                    <p className="text-sm text-gray-400">
                        This section is temporarily unavailable
                    </p>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary;