$(document).ready(function () {

	//アップバーの初期化
	app.appbar.init();

	// Charmにボタンを追加
	var sp = Windows.UI.ApplicationSettings.SettingsPane.getForCurrentView();
	sp.addEventListener("commandsrequested", function (e) {
		e.request.applicationCommands.append(new Windows.UI.ApplicationSettings.SettingsCommand(
			"privacypolicy",
			"プライバシーポリシー",
			function () {
				window.open(app.config.privacyurl);
			})
		);
		return;
	});

	return;
});