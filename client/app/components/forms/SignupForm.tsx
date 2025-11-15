'use client';
export function SignupForm() {
    return (
        <form>
            <h2>Sign Up</h2>
            <label>
                Username:
                <input type="text" name="username" />
            </label>
            <label>
                Password:
                <input type="password" name="password" />
            </label>
            <button type="submit">Sign Up</button>
        </form>
    );
}