use std::net::SocketAddr;


#[tokio::main]
async fn main() {
    use axum::{Router, routing::get};
    use leptos::logging::log;
    use leptos::prelude::*;
    use leptos_axum::{generate_route_list, LeptosRoutes};
    // todo: refactor shell out to common
    use admin::app::{App as AdminApp, shell as AdminShell};
    use polis::{App as PolisApp, shell as PolisShell};

    let addr: SocketAddr = "127.0.0.1:3000".parse().unwrap();
    let admin_options = LeptosOptions {
        output_name: "admin".into(),
        site_root: "target/site/admin".into(),
        site_pkg_dir: "admin/pkg".into(),
        env: Env::DEV,
        site_addr: "127.0.0.1:3000".parse().unwrap(),
        reload_port: 3001,
        reload_external_port: None,
        reload_ws_protocol: ReloadWSProtocol::WS,
        not_found_path: "/404".into(),
        hash_file: "hash.txt".into(),
        hash_files: false 
    };
    // Generate the list of routes in your Leptos App
    let admin_routes = generate_route_list(AdminApp);

    let admin_app = Router::new()
        .leptos_routes(&admin_options, admin_routes, {
            let admin_options = admin_options.clone();
            move || AdminShell(admin_options.clone())
        })
        .fallback(leptos_axum::file_and_error_handler(AdminShell))
        .with_state(admin_options);

    let polis_options = LeptosOptions {
        output_name: "polis".into(),
        site_root: "target/site/polis".into(),
        site_pkg_dir: "polis/pkg".into(),
        env: Env::DEV,
        site_addr: "127.0.0.1:3000".parse().unwrap(),
        reload_port: 3002,
        reload_external_port: None,
        reload_ws_protocol: ReloadWSProtocol::WS,
        not_found_path: "/404".into(),
        hash_file: "hash.txt".into(),
        hash_files: false 
    };

    let polis_routes = generate_route_list(PolisApp);

    let polis_app = Router::new()
        .leptos_routes(&polis_options, polis_routes, {
            let polis_options = polis_options.clone();
            move || PolisShell(polis_options.clone())
        })
        .fallback(leptos_axum::file_and_error_handler(PolisShell))
        .with_state(polis_options)
    ;

    let fake = get(|| async {});
    let blueprint = Router::new().route("/peaches", fake);

    let app = Router::new()
        .merge(blueprint)
        .nest("/admin", admin_app)
        .nest("/polis", polis_app)
    ;

    // run our app with hyper
    // `axum::Server` is a re-export of `hyper::Server`
    log!("listening on http://{}", &addr);
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app.into_make_service())
        .await
        .unwrap();
}
