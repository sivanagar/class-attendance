'use client';
export function SigninForm() {
    return (
        <form>
            <h2>Sign In</h2>
            <label>
                Username:
                <input type="text" name="username" />
            </label>
            <label>
                Password:
                <input type="password" name="password" />
            </label>
            <button type="submit">Sign In</button>
        </form>
    );
}