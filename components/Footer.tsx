export default function Footer() {
    return (
        <footer className="border-t bg-muted/50 mt-10">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Attendify. All rights reserved.
                </p>
            </div>
        </footer>

      
    );

}