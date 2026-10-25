# Rebuild the 1200 x 630 share card with Windows System.Drawing.
# Run: powershell -File scripts/create-social-preview.ps1
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path $PSScriptRoot -Parent
$scale = 2
$bitmap = New-Object System.Drawing.Bitmap (1200 * $scale), (630 * $scale)
$canvas = [System.Drawing.Graphics]::FromImage($bitmap)
$canvas.SmoothingMode = 'AntiAlias'
$canvas.TextRenderingHint = 'AntiAliasGridFit'
$canvas.InterpolationMode = 'HighQualityBicubic'
$canvas.ScaleTransform($scale, $scale)

function Brush($hex) { [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml($hex)) }
function Text($value, $size, $x, $y, $color, $bold = $false, $family = 'Segoe UI') {
    $style = if ($bold) { [System.Drawing.FontStyle]::Bold } else { [System.Drawing.FontStyle]::Regular }
    $font = [System.Drawing.Font]::new($family, $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
    $ink = Brush $color
    $canvas.DrawString($value, $font, $ink, [single]$x, [single]$y)
    $font.Dispose(); $ink.Dispose()
}
function RoundRect($x, $y, $width, $height, $radius) {
    $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $diameter = $radius * 2
    $path.AddArc($x, $y, $diameter, $diameter, 180, 90)
    $path.AddArc(($x + $width - $diameter), $y, $diameter, $diameter, 270, 90)
    $path.AddArc(($x + $width - $diameter), ($y + $height - $diameter), $diameter, $diameter, 0, 90)
    $path.AddArc($x, ($y + $height - $diameter), $diameter, $diameter, 90, 90)
    $path.CloseFigure()
    return $path
}

$canvas.Clear([System.Drawing.ColorTranslator]::FromHtml('#101310'))
$grid = Brush '#252a23'
for ($x = 34; $x -lt 1200; $x += 28) {
    for ($y = 28; $y -lt 630; $y += 28) { $canvas.FillEllipse($grid, $x, $y, 1.5, 1.5) }
}
$accent = Brush '#d9a16e'
$canvas.FillRectangle($accent, 64, 68, 26, 3)
Text 'INDEPENDENT DEVELOPER' 12 102 59 '#bec5b5' $false 'Consolas'
Text 'Abhijeet' 72 58 132 '#f1f1e8' $true
Text 'Sodlan.' 72 58 211 '#f1f1e8' $true
Text 'Thoughtful apps.' 29 63 327 '#d9a16e'
Text 'Built for the web & mobile.' 29 63 369 '#d9a16e'

$line = [System.Drawing.Pen]::new([System.Drawing.ColorTranslator]::FromHtml('#353c31'), 1)
$canvas.DrawLine($line, 64, 459, 633, 459)
Text 'REACT / NEXT.JS / NODE.JS / REACT NATIVE' 12 63 480 '#aeb8a4' $false 'Consolas'
Text 'SELECTED WORK & A LITTLE LIFE BEYOND THE SCREEN' 11 63 552 '#899780' $false 'Consolas'

# An inset portrait preserves a clear face at small preview sizes.
$frame = RoundRect 742 63 388 504 22
$frameInk = Brush '#252e22'
$canvas.FillPath($frameInk, $frame)
$photoShape = RoundRect 758 79 356 472 13
$state = $canvas.Save()
$canvas.SetClip($photoShape)
$photo = [System.Drawing.Image]::FromFile((Join-Path $projectRoot 'public/images/my.jpg'))
$canvas.DrawImage($photo, [System.Drawing.RectangleF]::new(758, 79, 356, 472), [System.Drawing.RectangleF]::new(25, 0, 668, 886), [System.Drawing.GraphicsUnit]::Pixel)
$shade = [System.Drawing.Drawing2D.LinearGradientBrush]::new([System.Drawing.Point]::new(0, 390), [System.Drawing.Point]::new(0, 555), [System.Drawing.Color]::Transparent, [System.Drawing.Color]::FromArgb(220, 14, 22, 15))
$canvas.FillRectangle($shade, 758, 390, 356, 165)
$canvas.Restore($state)
Text 'CODE. CREATE. CULTIVATE.' 11 780 515 '#f2efdf' $false 'Consolas'

# Small orbit accent ties the card to the portfolio's personal journal.
$orbit = [System.Drawing.Pen]::new([System.Drawing.ColorTranslator]::FromHtml('#d9a16e'), 1.5)
$canvas.DrawEllipse($orbit, 699, 490, 38, 38)
$canvas.DrawEllipse($orbit, 687, 502, 62, 14)

$output = [System.Drawing.Bitmap]::new(1200, 630)
$outputCanvas = [System.Drawing.Graphics]::FromImage($output)
$outputCanvas.InterpolationMode = 'HighQualityBicubic'
$outputCanvas.DrawImage($bitmap, 0, 0, 1200, 630)
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
$parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]94)
$destination = Join-Path $projectRoot 'public/social-preview-v2.jpg'
$output.Save($destination, $encoder, $parameters)
$photo.Dispose(); $canvas.Dispose(); $bitmap.Dispose(); $outputCanvas.Dispose(); $output.Dispose()
$grid.Dispose(); $accent.Dispose(); $line.Dispose(); $frame.Dispose(); $frameInk.Dispose(); $photoShape.Dispose(); $shade.Dispose(); $orbit.Dispose(); $parameters.Dispose()
Write-Output "Created $destination (1200 x 630)"
