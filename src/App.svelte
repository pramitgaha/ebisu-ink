<script>
    import {Router, Route, Link} from "svelte-routing";

    import HomePage from "./pages/HomePage.svelte";
    import Auction from "./pages/Auction.svelte";
    import AuctionHistory from "./pages/AuctionHistory.svelte";
    import Loan from "./pages/Loan.svelte";
    import LoanHistory from "./pages/LoanHistory.svelte";
    import Vault from "./pages/Vault.svelte";
    import AuctionInfo from "./pages/AuctionInfo.svelte";
    import LoanInfo from "./pages/LoanInfo.svelte";
    export let url = "";
</script>

<main>
    <Router url={url}>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/auction">Auction</Link>
            <Link to="/auction-history">Auction History</Link>
            <Link to="/loan">Loan</Link>
            <Link to="/loan-history">Loan-history</Link>
            <Link to="/vault">Vault</Link>
        </nav>
        <Route path="auction" component={Auction} />
        <Route path="/auction/:id" component={AuctionInfo} />
        <Route path="auction-history" component={AuctionHistory} />
        <Route path="loan" component={Loan} />
        <Route path="/loan/:id" component={LoanInfo} />
        <Route path="loan-history" component={LoanHistory} />
        <Route path="vault" component={Vault} />
        <Route path="/"><HomePage /></Route>
        <Route path="/*"><HomePage /></Route>
    </Router>
</main>

<style>
    main nav{
        background-color: white;
        text-align: center;
    }
</style>